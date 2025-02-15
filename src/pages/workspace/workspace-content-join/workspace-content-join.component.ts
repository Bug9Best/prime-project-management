import { Component, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { Mode } from '../workspace-content-project/workspace-content-project.component';
import { AccordionModule } from 'primeng/accordion';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from '../../../services/project/project.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormProjectJoin } from '../component/form-project-join/form-project-join.component';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'workspace-content-join',
  imports: [
    CommonModule,
    AppHeader,
    AppDialog,
    AppFilter,
    AppScrolling,
    AppEmpty,
    FormProjectJoin,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    TranslateModule
  ],
  templateUrl: './workspace-content-join.component.html',
  styleUrl: './workspace-content-join.component.scss'
})
export class WorkspaceContentJoin {

  currentUser: any = {};
  mode: Mode = 'NONE';

  isShowToolbar = false;
  isOnSearch = false;
  title = 'WORKSPACE_MENU_JOIN_TITLE';
  subtitle = 'WORKSPACE_MENU_JOIN_SUBTITLE';

  sortValue = 'NONE';
  groupValue = 'NONE';

  listProject: any[] = []
  templistProject: any[] = [];
  grouplistProject: { [key: string]: any[] } = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translaterService: TranslateService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserData();
    this.getProjects();
  }

  getProjects() {
    this.projectService
      .getAllPublicProject(this.currentUser.id)
      .subscribe({
        next: (response: any) => {
          this.listProject = response;
          this.templistProject = [...this.listProject];
        },
      });
  }

  onSearch(event: any) {
    if (!event || event.trim() === '') {
      this.isOnSearch = false;
      this.listProject = [...this.templistProject];
      if (this.mode === 'GROUP') {
        this.grouplistProject = this.groupByType(this.templistProject);
      }
      return;
    }

    const searchTerm = event.toLowerCase().trim();
    this.isOnSearch = true;

    if (this.mode === 'GROUP') {
      const filteredList = this.templistProject.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm) ||
        item.project_type.toLowerCase().includes(searchTerm)
      );
      this.grouplistProject = this.groupByType(filteredList);
    } else {
      this.listProject = this.templistProject.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm) ||
        item.project_type.toLowerCase().includes(searchTerm)
      );
    }
  }

  setGroupValue(event: any) {
    this.groupValue = event.value;
    switch (this.groupValue) {
      case 'NONE':
        this.mode = 'NONE';
        this.listProject = this.isOnSearch ? this.listProject : this.templistProject;
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      case 'TYPE':
        this.mode = 'GROUP';
        this.grouplistProject = this.groupByType(this.isOnSearch ? this.listProject : this.templistProject);
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      default:
        break;
    }
  }

  groupByType(items: any[]): { [key: string]: any[] } {
    return items.reduce((acc, item) => {
      const typeKey = item.project_type.split(' ')[0];
      acc[typeKey] = acc[typeKey] || [];
      acc[typeKey].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  setSortValue(event: { value: string }): void {
    this.sortValue = event.value;

    const sortBy: Record<string, (a: any, b: any) => number> = {
      'NAME_ASC': (a, b) => a.project_name.localeCompare(b.project_name),
      'NAME_DESC': (a, b) => b.project_name.localeCompare(a.project_name),
      'TYPE_ASC': (a, b) => a.project_type.localeCompare(b.project_type),
      'TYPE_DESC': (a, b) => b.project_type.localeCompare(a.project_type),
      'DATE_ASC': (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      'DATE_DESC': (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    };

    const sortFunction = sortBy[this.sortValue];
    const defaultSort = (a: any, b: any) => a.id - b.id;

    if (this.sortValue === 'NONE') {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistProject).forEach(key => {
          this.grouplistProject[key]?.sort(defaultSort);
        });
      } else {
        this.listProject.sort(defaultSort);
      }
    } else if (sortFunction) {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistProject).forEach(key => {
          this.grouplistProject[key]?.sort(sortFunction);
        });
      }
      this.listProject.sort(sortFunction);
    }
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  resetForm() {
    this.formProjectJoin.formGroup.reset();
  }

  @ViewChild(FormProjectJoin) formProjectJoin!: FormProjectJoin;
  onValidateForm() {
    if (this.formProjectJoin.formGroup.invalid) {
      this.formProjectJoin.formGroup.markAllAsTouched();
      console.log('Form invalid');
      return;
    }

    let values = this.formProjectJoin.formGroup.value;
    values.user_id = this.currentUser.id;
    this.onJoinPrivateProject(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onJoinPrivateProject(param: any) {
    this.projectService
      .joinPrivateProject(param)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Join project successfully');
          this.appDialog.visible = false;
          this.resetForm();
          this.getProjects();
        },
        error: (error) => {
          this.showMessage('error', 'Error', error.error.message);
        }
      });
  }

  joinPublicProject(project: any) {
    let values = {
      project_id: project.id,
      user_id: this.currentUser.id
    }

    let lang = this.translaterService.currentLang;
    let isThaiLanguage = lang === 'th';
    this.confirmationService.confirm({
      header: isThaiLanguage ? 'แน่ใจหรือไม่' : 'Confirmation',
      message: isThaiLanguage ? 'ท่านต้องการเข้าร่วมโปรเจค "' + project.project_name + '" หรือไม่?' : 'Are you sure you want to join "' + project.project_name + '" project?',
      acceptLabel: isThaiLanguage ? 'ตกลง' : 'Join Project',
      rejectLabel: isThaiLanguage ? 'ยกเลิก' : 'Cancel',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.projectService
          .joinPublicProject(values)
          .subscribe({
            next: (response) => {
              this.showMessage('success', 'Success', 'Join project successfully');
              this.getProjects();
            },
            error: (error) => {
              this.showMessage('error', 'Error', error.error.message);
            }
          });
      }
    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AccordionModule } from 'primeng/accordion';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../../services/project/project.service';
import { Router } from '@angular/router';
import { FormProjectCreate } from '../component/form-project-create/form-project-create.component';
import { AuthService } from '../../../services/auth/auth.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../../services/user/user.service';
import { firstValueFrom } from 'rxjs';

export type Mode = 'NONE' | 'GROUP';

@Component({
  selector: 'workspace-content-project',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppHeader,
    AppDialog,
    AppFilter,
    AppScrolling,
    AppEmpty,
    FormProjectCreate,
    ButtonModule,
    AccordionModule
  ],
  templateUrl: './workspace-content-project.component.html',
  styleUrl: './workspace-content-project.component.scss'
})
export class WorkspaceContentProject {

  currentUser: any = {};
  isUser: boolean = false;

  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  title = 'WORKSPACE_MENU_PROJECT_TITLE';
  subtitle = 'WORKSPACE_MENU_PROJECT_SUBTITLE';

  sortValue = 'NONE';
  groupValue = 'NONE';

  listProject: any[] = [];
  templistProject: any[] = [];
  grouplistProject: { [key: string]: any[] } = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private projectService: ProjectService
  ) {
    this.currentUser = this.authService.getUserData();
    this.isUser = this.authService.isUser();
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    if (!this.currentUser) return;
    let user_id = this.currentUser.id;
    this.projectService
      .getAllJoinedProject(user_id)
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
    this.formProjectCreate.formGroup.reset();
  }

  @ViewChild(FormProjectCreate) formProjectCreate!: FormProjectCreate;
  onValidateForm() {
    let project_type = this.formProjectCreate.getProjectType();
    this.formProjectCreate.formGroup
      .patchValue({
        project_type: project_type
      });

    if (this.formProjectCreate.formGroup.invalid) {
      this.formProjectCreate.formGroup.markAllAsTouched();
      console.log('Form invalid');
      return;
    }

    let values = this.formProjectCreate.formGroup.value;
    values.owner_id = this.currentUser.id;
    this.onCreateProject(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onCreateProject(param: any) {
    this.projectService
      .createProject(param)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Create project successfully');
          this.appDialog.visible = false;
          this.resetForm();
          this.getProjects();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Create project failed');
        }
      });
  }

  async onSelectedProject(project: any) {
    const isDisabled = await this.checkPermission();
    if (isDisabled) {
      this.showMessage('warn', 'Warning', 'You have been blocked by the admin');
      return;
    }
    this.router.navigate(['/project', project.id]);
  }

  async checkPermission(): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.userService.checkPermission(this.currentUser.id));
      return response.is_disabled;
    } catch (error) {
      return false;
    }
  }
}

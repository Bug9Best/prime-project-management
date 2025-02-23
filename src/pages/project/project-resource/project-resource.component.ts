import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { ResourceCreateDialog } from './resource-create-dialog/resource-create-dialog.component';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { ButtonModule } from 'primeng/button';
import { ProjectResourceModel, ProjectResourceService } from '../../../services/project-resource/project-resource.service';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { ResourceList } from './resource-list/resource-list.component';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { Mode } from '../../workspace/workspace-content-project/workspace-content-project.component';

@Component({
  selector: 'project-resource',
  imports: [
    CommonModule,
    AppHeader,
    AppFilter,
    AppScrolling,
    AppDialog,
    TranslateModule,
    ResourceCreateDialog,
    ResourceList,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './project-resource.component.html',
  styleUrl: './project-resource.component.scss'
})
export class ProjectResource {

  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  sortValue = 'NONE';

  title: string = 'project.title.resource';
  subtitle: string = 'project.subtitle.resource';

  selectedResource?: ProjectResourceModel;
  listResource: ProjectResourceModel[] = [];
  tempListResource: ProjectResourceModel[] = [];
  listMenu: MenuItem[] = [
    {
      id: 'EDIT',
      label: 'BUTTON_EDIT',
      icon: 'pi pi-pencil',
      styleClass: 'text-sm',
      disabled: false,
      command: (event) => {
        this.editResource();
      },
    },
    { separator: true },
    {
      id: 'DELETE',
      label: 'BUTTON_DELETE',
      icon: 'pi pi-trash',
      styleClass: 'text-sm',
      disabled: false,
      command: (event) => {
        this.onConfirm();
      },
    },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private projectResourceService: ProjectResourceService
  ) { }

  ngAfterViewInit() {
    this.getResourceList();
  }

  @ViewChild(ResourceList) resourceList!: ResourceList;
  getResourceList() {
    this.projectResourceService
      .getAll()
      .subscribe((res: any) => {
        const data = res.data;
        this.listResource = data;
        this.tempListResource = [...this.listResource];
      });
  }

  onSearch(event: any): void {
    if (!event || event.trim() === '') {
      this.isOnSearch = false;
      this.listResource = [...this.tempListResource];
      return;
    }

    const searchTerm = event.toLowerCase().trim();
    this.isOnSearch = true;
    this.listResource = this.tempListResource.filter((item) =>
      item.topic.toLowerCase().includes(searchTerm)
    );
  }

  setSortValue(event: any): void {
    this.sortValue = event.value;
    const sortBy: Record<string, (a: any, b: any) => number> = {
      'NAME_ASC': (a, b) => a.topic.localeCompare(b.topic),
      'NAME_DESC': (a, b) => b.topic.localeCompare(a.topic),
      'TYPE_ASC': (a, b) => a.resource_type.localeCompare(b.resource_type),
      'TYPE_DESC': (a, b) => b.resource_type.localeCompare(a.resource_type),
      'DATE_ASC': (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      'DATE_DESC': (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    };

    const sortFunction = sortBy[this.sortValue];
    const defaultSort = (a: any, b: any) => a.id - b.id;

    if (this.sortValue === 'NONE') {
      this.listResource.sort(defaultSort);
    } else if (sortFunction) {
      this.listResource.sort(sortFunction);
    }
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  setPermission(resource: ProjectResourceModel) {
    const user_id = 1;
    // TODO: get user_id from auth service
    const permission = resource.owner_id === user_id ? 'OWNER' : 'MEMBER';
    this.selectedResource = resource;
    if (permission === 'MEMBER') {
      this.listMenu[0].disabled = true;
      this.listMenu[2].disabled = true;
    }
  }

  editResource() {
  }

  onConfirm() {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to delete this resource?',
      accept: () => {
        this.onDeleteResource();
      },
    });

  }

  onDeleteResource() {
    if (!this.selectedResource) return;
    this.projectResourceService
      .delete(this.selectedResource.id)
      .subscribe((res: any) => {
        this.showMessage('success', 'Success', 'Delete resource successfully');
        this.getResourceList();
      });
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onCloseDialog(state: boolean) {
    this.appDialog.visible = false;
    (state) ? this.getResourceList() : null;
  }

  onValidateForm() {
  }
}

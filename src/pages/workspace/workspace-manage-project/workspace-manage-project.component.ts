import { Component, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { Mode } from '../workspace-content-project/workspace-content-project.component';
import { CommonModule } from '@angular/common';
import { ProjectService, ProjectsModel } from '../../../services/project/project.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { AppTable, AppTableColumn, AppTableFieldDirective } from '../../../components/app-table/app-table.component';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { ProjectTypeTag } from '../component/project-type-tag/project-type-tag.component';
import { ProjectDetailDialog } from '../component/project-detail-dialog/project-detail-dialog.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'workspace-manage-project',
  imports: [
    CommonModule,
    AppHeader,
    AppFilter,
    AppEmpty,
    AppTable,
    AppScrolling,
    ProjectTypeTag,
    ProjectDetailDialog,
    ButtonModule,
    AppTableFieldDirective
  ],
  templateUrl: './workspace-manage-project.component.html',
  styleUrl: './workspace-manage-project.component.scss'
})
export class WorkspaceManageProject {

  isLoading = true;
  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;

  title = 'workspace.title.manageProject';
  subtitle = 'workspace.subtitle.manageProject';
  emptyTitle = 'workspace.projectEmpty.title';
  emptyDescription = 'workspace.projectEmpty.description';

  sortValue = 'NONE';
  groupValue = 'NONE';

  listProject: ProjectsModel[] = []
  templistProject: ProjectsModel[] = [];
  grouplistProject: { [key: string]: ProjectsModel[] } = {};

  listColumn: AppTableColumn[] = [
    { label: 'table.manageProject.header.name', field: 'project_name', type: 'string', style: { width: '30%' }, selectable: true },
    { label: 'table.manageProject.header.owner', field: 'owner_name', type: 'string', style: { width: '30%' } },
    { label: 'table.manageProject.header.createDate', field: 'created_at', type: 'date', style: { width: '20%' } },
    { label: 'table.manageProject.header.type', field: 'project_type', type: 'string', style: { width: '20%', textAlign: 'center' } },
  ];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.isLoading = false;
    this.getProjectList();
  }

  getProjectList() {
    this.projectService
      .getAll()
      .subscribe((res: any) => {
        this.listProject = res.data;
        this.templistProject = this.listProject;
      });
  }

  onReloadUser(state: boolean) {
    if (state) {
      this.getProjectList();
      return;
    }
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
        item.project_name.toLowerCase().includes(searchTerm)
      );
      this.grouplistProject = this.groupByType(filteredList);
    } else {
      this.listProject = this.templistProject.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm)
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

  @ViewChild(ProjectDetailDialog) projectDetailDialog!: ProjectDetailDialog;
  onClickItem(user: any) {
    this.projectDetailDialog.showDialog(user);
  }
}

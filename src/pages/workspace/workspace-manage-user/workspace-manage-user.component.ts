import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { Mode } from '../workspace-content-project/workspace-content-project.component';
import { UserProfile } from '../../../../public/data/user';
import { AppTable, AppTableColumn, AppTableFieldDirective } from '../../../components/app-table/app-table.component';
import { ButtonModule } from 'primeng/button';
import { MemberRoleTag } from '../component/member-role-tag/member-role-tag.component';
import { UserService } from '../../../services/user/user.service';
import { MemberDetailDialog } from '../component/member-detail-dialog/member-detail-dialog.component';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';

@Component({
  selector: 'workspace-manage-user',
  imports: [
    CommonModule,
    AppHeader,
    AppFilter,
    AppEmpty,
    AppScrolling,
    AppTable,
    ButtonModule,
    MemberRoleTag,
    MemberDetailDialog,
    AppTableFieldDirective
  ],
  templateUrl: './workspace-manage-user.component.html',
  styleUrl: './workspace-manage-user.component.scss'
})
export class WorkspaceManageUser {

  isLoading = true;
  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  title = 'workspace.title.manageUser';
  subtitle = 'workspace.subtitle.manageUser';
  emptyTitle = 'workspace.userEmpty.title';
  emptyDescription = 'workspace.userEmpty.description';

  sortValue = 'NONE';
  groupValue = 'NONE';

  listUser: UserProfile[] = []
  templistUser: UserProfile[] = [];
  grouplistUser: { [key: string]: UserProfile[] } = {};

  listColumn: AppTableColumn[] = [
    { label: 'TABLE_HEADER_EMAIL', field: 'email', type: 'string', style: { width: '30%' } },
    { label: 'TABLE_HEADER_NAME', field: 'name', type: 'string', style: { width: '30%' } },
    { label: 'TABLE_HEADER_CREATE_DATE', field: 'created_at', type: 'date', style: { width: '20%' } },
    { label: 'TABLE_HEADER_ROLE', field: 'role', type: 'string', style: { width: '20%', textAlign: 'center' } },
  ];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isLoading = false;
    this.getUserList();
  }

  getUserList() {
    this.userService
      .getAllUser()
      .subscribe((res) => {
        this.listUser = res;
        this.templistUser = this.listUser;
        console.log(this.listUser);
      });
  }

  onReloadUser(state: boolean) {
    if (state) {
      this.getUserList();
      return;
    }
  }

  @ViewChild(MemberDetailDialog) memberDetailDialog!: MemberDetailDialog;
  onClickItem(user: any) {
    this.memberDetailDialog.showDialog(user);
  }

  onSearch(event: any) {
    if (!event || event.trim() === '') {
      this.isOnSearch = false;
      this.listUser = [...this.templistUser];
      if (this.mode === 'GROUP') {
        this.grouplistUser = this.groupByType(this.templistUser);
      }
      return;
    }

    const searchTerm = event.toLowerCase().trim();
    this.isOnSearch = true;

    if (this.mode === 'GROUP') {
      const filteredList = this.templistUser.filter((item) =>
        item.full_name.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm)
      );
      this.grouplistUser = this.groupByType(filteredList);
    } else {
      this.listUser = this.templistUser.filter((item) =>
        item.full_name.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm)
      );
    }
  }

  setGroupValue(event: any) {
    this.groupValue = event.value;
    switch (this.groupValue) {
      case 'NONE':
        this.mode = 'NONE';
        this.listUser = this.isOnSearch ? this.listUser : this.templistUser;
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      case 'TYPE':
        this.mode = 'GROUP';
        this.grouplistUser = this.groupByType(this.isOnSearch ? this.listUser : this.templistUser);
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
        Object.keys(this.grouplistUser).forEach(key => {
          this.grouplistUser[key]?.sort(defaultSort);
        });
      } else {
        this.listUser.sort(defaultSort);
      }
    } else if (sortFunction) {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistUser).forEach(key => {
          this.grouplistUser[key]?.sort(sortFunction);
        });
      }
      this.listUser.sort(sortFunction);
    }
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { Mode } from '../workspace-content-project/workspace-content-project.component';
import { ButtonModule } from 'primeng/button';
import { listUser, UserProfile } from '../../../../public/data/user';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { AppTable } from '../../../components/app-table/app-table.component';

@Component({
  selector: 'workspace-content-member',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppHeader,
    AppFilter,
    AppScrolling,
    AppTable,

    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ContextMenuModule,
    MultiSelectModule,
    SelectModule,
    TagModule,
    InputTextModule 
  ],
  templateUrl: './workspace-content-member.component.html',
  styleUrl: './workspace-content-member.component.scss'
})
export class WorkspaceContentMember {

  isLoading = true;
  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  title = 'WORKSPACE_MENU_USERS_TITLE';
  subtitle = 'WORKSPACE_MENU_USERS_SUBTITLE';

  sortValue = 'NONE';
  groupValue = 'NONE';

  listUser: UserProfile[] = []
  templistUser: UserProfile[] = [];
  grouplistUser: { [key: string]: UserProfile[] } = {};

  items = [
    { label: 'Add to Project', icon: 'pi pi-plus' },
    { separator: true },
    { label: 'Disable', icon: 'pi pi-times' }
  ]

  ngOnInit() {
    this.listUser = listUser;
    this.isLoading = false;
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

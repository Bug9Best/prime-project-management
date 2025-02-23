import { CommonModule } from '@angular/common';
import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-filter',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DividerModule,
    TranslateModule,
    MenuModule,
    TieredMenuModule,
  ],
  templateUrl: './app-filter.component.html',
  styleUrl: './app-filter.component.scss'
})
export class AppFilter {

  labelSearch: string = 'app.filter.search';
  labelGroup: string = 'app.filter.group';
  labelSort: string = 'app.filter.sort';
  showGroupList = model<boolean>(true);
  showSortList = model<boolean>(true);

  searchValue: string = '';

  groupValue: { label: string, value: string } = {
    label: 'Group by none',
    value: 'NONE'
  };

  sortValue: { label: string, value: string } = {
    label: 'Sort by none',
    value: 'NONE',
  };

  groupItems = [
    {
      label: 'app.group.none',
      value: 'NONE'
    },
    {
      label: 'app.group.type',
      value: 'TYPE'
    },
  ];

  sortItems = [
    {
      label: 'app.sort.none',
      value: 'NONE',
    },
    {
      label: 'app.sort.nameAsc',
      value: 'NAME_ASC',
    },
    {
      label: 'app.sort.nameDesc',
      value: 'NAME_DESC',
    },
    {
      label: 'app.sort.typeAsc',
      value: 'TYPE_ASC',
    },
    {
      label: 'app.sort.typeDesc',
      value: 'TYPE_DESC',
    },
  ]

  setGroupValueEvent = output<any>();
  setGroupValue(value: { label: string, value: string }): void {
    this.groupValue = value;
    this.setGroupValueEvent.emit(value);
  }

  setSortValueEvent = output<any>();
  setSortValue(value: { label: string, value: string }): void {
    this.sortValue = value;
    this.setSortValueEvent.emit(value);
  }

  onSearchEvent = output<string>();
  onSearch(): void {
    this.onSearchEvent.emit(this.searchValue);
  }
}

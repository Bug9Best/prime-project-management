import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Directive, input, Input, output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';

import { ThaiDatePipe } from '../../helper/pipe/thdate.pipe';
import { Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Directive({
  selector: '[appTableField]'
})
export class AppTableFieldDirective {
  @Input('appTableField')
  name: string = "default";

  constructor(public templateRef: TemplateRef<any>) { }
  public getName(): string {
    return this.name;
  }
}

export type AppTableFieldTemplate = {
  [name: string]: TemplateRef<any>;
};

export type AppTableColumnType = "string" | "number" | "date" | "button" | "checked" | "control" | "citizen" | 'html' | 'image' | 'link' | 'tag' | 'process' | 'currency' | 'progress';
export class AppTableColumn {
  label: string = "Column";
  field: string = "default";
  type: AppTableColumnType = "string";
  style?: any = { minWidth: '200px' };
  styleClass?: string = "";
  colSpan?: number = 0;
  numberFormat?: string = "0.0-0";
  dateFormat?: string = "date";
  emptyText?: string = "-";
}

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    TranslateModule,
    ThaiDatePipe,
    TableModule,
    ContextMenuModule,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss'
})
export class AppTable {

  isShowToolbar = input<boolean>(false);
  
  listItem = input<any[]>([]);
  listColumns = input<AppTableColumn[]>([]);
  showOrder = input<boolean>(true);
  showOrderIndex = input<number>(0);
  scrollable = input<boolean>(true);

  paginator = input<boolean>(false);
  totalRecords = input<number>(10);
  rowsPerPageOptions = input<number[]>([5, 10, 20, 50]);

  selectionMode = input<any>('single');
  metaKeySelection = input<string>('');
  dataKey = input<string>('id');
  selectionKeys = input<any[]>([]);

  @ContentChildren(AppTableFieldDirective)
  templates: AppTableFieldDirective[] = [];
  template: AppTableFieldTemplate = {};

  ngAfterContentInit(): void {
    this.templates.forEach(t => {
      this.template[t.getName()] = t.templateRef;
    })
    if (!this.listItem()) return;
  }

  onClickItemEvent = output<any>();
  onClickItem(item: any) {
    this.onClickItemEvent.emit(item);
  }
}
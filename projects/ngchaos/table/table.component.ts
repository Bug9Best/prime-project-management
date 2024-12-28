import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Directive, inject, Input, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChaosTemplateDirective, ChaosThaiDatePipe } from 'ngchaos/directive';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ChaosTableFieldDirective } from './table.directive';
import { ChaosPageService } from 'ngchaos/api';

export type ChaosTableColumnType = "string"|"number"|"date"|"button"|"checked"|"fileSize"|"control";
export class ChaosTableColumn {
  label: string = "Column";
  field: string = "default";
  type: ChaosTableColumnType = "string";
  style?: any = { minWidth: '200px' };
  styleClass?: string = "";
  colSpan?: number = 0;
  numberFormat?: string = "0.0-0";
  dateFormat?: string = "date";
  emptyText?: string = "-";
}

export type ChaosTableFieldTemplate = {
  [name: string]: TemplateRef<any>;
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    CheckboxModule,
    ChaosThaiDatePipe
  ],
  selector: 'chaos-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ChaosTable implements AfterContentInit {

  page = inject(ChaosPageService);

  @Input()
  selectedData: any;

  @Input()
  selectionMode: "single"|"multiple"|null|undefined = null;

  @Input()
  rowHover: boolean = false;

  @Input()
  dataKey: string = "id";

  @Input()
  tableStyle: any = {
    font: this.page.font(),
    fontSize: this.page.fontSize()
  };

  @Input()
  tableStyleClass: string = "p-datatable-striped";

  @Input()
  scrollable: boolean = false;

  @Input()
  scrollDirection: "vertical" | "horizontal" | "both" = "both";

  @Input()
  scrollHeight: string = "";

  @Input()
  showColumn: boolean = true;

  @Input()
  columns: ChaosTableColumn[] = [];

  @Input()
  value: any[] = [];

  @ContentChildren(ChaosTableFieldDirective)
  fields: ChaosTableFieldDirective[] = [];
  field: ChaosTableFieldTemplate = {};

  @ContentChildren(ChaosTemplateDirective)
  templates: ChaosTemplateDirective[] = [];
  footerTemplate?: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.fields.forEach(t => {
      this.field[t.getName()] = t.templateRef;
    });
    this.templates.forEach(t => {
      if (t.getType() === "footer") {
        this.footerTemplate = t.templateRef;
      }
    });
  }

  getFieldValue(data: any, field: string): any {
    let value = data[field];
    if (field.indexOf('->') > 0) {
      let fields = field.split('->');
      let value = data;
      for (let f of fields) {
        value = value[f];
      }
    }
    return this.getFieldFormat(value);
  }
  
  getFieldFormat(value: any) {
    if (value === null || value === undefined) {
      return '-';
    }
    return value;
  }
}

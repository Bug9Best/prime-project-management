import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [
    TableModule 
  ],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss'
})
export class AppTable {

  @Input()
  showHeader = true;

  @Input()
  listItem: any[] = [];

  @Input()
  listColumn: any[] = [];
}

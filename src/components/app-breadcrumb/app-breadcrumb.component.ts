import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    TranslateModule,
    BreadcrumbModule,
    DividerModule
  ],
  templateUrl: './app-breadcrumb.component.html',
  styleUrl: './app-breadcrumb.component.scss'
})
export class AppBreadcrumb {

  @Input()
  items: MenuItem[] = [];

  @Input()
  subtitle: string = 'project.title.sprint';
}

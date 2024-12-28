import { Component, ContentChildren, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUserComponent } from './page-user/page-user.component';
import { PageSidebarComponent } from './page-sidebar/page-sidebar.component';
import { ChaosPageService } from 'ngchaos/api';
import { ChaosTemplateDirective } from 'ngchaos/directive';
import { PageToggleComponent } from './page-toggle/page-toggle.component';
import { PageThemeComponent } from './page-theme/page-theme.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageSidebarComponent,
    PageUserComponent,
    PageToggleComponent,
    PageThemeComponent
  ],
  selector: 'chaos-page',
  templateUrl: './chaos-page.component.html',
  styleUrls: ['./chaos-page.component.scss']
})
export class ChaosPage  {
  
  @ContentChildren(ChaosTemplateDirective)
  templates: ChaosTemplateDirective[] = [];
  template: Record<string, TemplateRef<any>> = {};
  
  ngAfterContentInit(): void {
    this.templates.forEach(res => {
      let type = res.getType();
      this.template[type] = res.templateRef;
    });
  }
  
  @ViewChild(PageSidebarComponent)
  sidebar!: PageSidebarComponent;
  
  openSidebar() {
    this.sidebar.open();
  }
  
}

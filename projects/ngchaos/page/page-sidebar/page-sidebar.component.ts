import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { PageMenuComponent } from '../page-menu/page-menu.component';
import { CommonModule } from '@angular/common';
import { PageItemComponent } from '../page-item/page-item.component';

@Component({
  selector: 'c-pageSidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    PageMenuComponent,
    PageItemComponent
  ],
  templateUrl: './page-sidebar.component.html',
  styleUrl: './page-sidebar.component.scss'
})
export class PageSidebarComponent {
  
  visible: boolean = false;
  
  open() {
    this.visible = true;
  }
  
  signOut() {
  
  }
}

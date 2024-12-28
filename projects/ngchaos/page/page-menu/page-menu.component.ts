import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { PageItemComponent } from '../page-item/page-item.component';
import { Router } from '@angular/router';
import { ChaosPageService } from 'ngchaos/api';

@Component({
  selector: 'c-pageMenu',
  standalone: true,
  imports: [
    CommonModule,
    PageItemComponent
  ],
  templateUrl: './page-menu.component.html',
  styleUrl: './page-menu.component.scss'
})
export class PageMenuComponent {
  
  filteredMenus: any[] = [];
  
  constructor(
    private page: ChaosPageService,
    private router: Router
  ) {
    effect(() => {
      this.filteredMenus = this.page.menu();
    });
  }
  
  routeTo(route: string) {
    this.router.navigate([route]);
  }
  
  onSelect(item: any) {
    this.router.navigate([item.routerLink]);
  }

}

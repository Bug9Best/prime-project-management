import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StyleClass } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'layout-topbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    StyleClass,
    AvatarModule,
    MenuModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './app-layout-topbar.component.html',
  styleUrl: './app-layout-topbar.component.scss'
})
export class AppLayoutTopbar {

  @Input()
  listMenu: MenuItem[] = [];

  items = [
    {
      separator: true
    },
    {
      label: 'Profile',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          shortcut: '⌘+O'
        },
        {
          label: 'Messages',
          icon: 'pi pi-inbox',
          badge: '2'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          shortcut: '⌘+Q'
        }
      ]
    },
  ];


  @ViewChild('overlay') overlay!: ElementRef;
  onOpenOverlayPanel(): void {
    this.overlay.nativeElement.style.display = 'block';
  }

  onCloseOverlayPanel(): void {
    this.overlay.nativeElement.style.display = 'none';
  }

  translateService = inject(TranslateService);
  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.onCloseOverlayPanel();
  }
}

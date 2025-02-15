import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StyleClass } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../environments/environment';

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

  items: MenuItem[] = [
    {
      label: 'User Profile',
      icon: 'pi pi-user',
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.onSignOut();
      }
    }
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

  authService = inject(AuthService);
  onSignOut() {
    this.authService.signOut().subscribe({
      next: (response) => {
        this.authService.removeToken();
        this.authService.removeUserData();
        window.location.href = environment.authenUrl;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}


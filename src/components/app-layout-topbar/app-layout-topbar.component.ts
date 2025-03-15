import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StyleClass } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../environments/environment';
import { DividerModule } from 'primeng/divider';

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
    DividerModule,
    RouterLink
  ],
  templateUrl: './app-layout-topbar.component.html',
  styleUrl: './app-layout-topbar.component.scss'
})
export class AppLayoutTopbar {

  @Input()
  listMenu: MenuItem[] = [];

  userData = <any>{};

  items: MenuItem[] = [
    {
      separator: true
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.onSignOut();
      }
    }
  ];

  ngOnInit() {
    this.userData = this.authService.getUserData();
  }


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
  router = inject(Router);
  onSignOut() {
    this.authService.signOut().subscribe({
      next: (response) => {
        this.authService.removeToken();
        this.authService.removeUserData();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}


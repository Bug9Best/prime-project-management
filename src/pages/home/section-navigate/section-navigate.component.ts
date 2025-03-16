declare const google: any;

import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { StyleClass } from 'primeng/styleclass';
import { AuthService } from '../../../services/auth/auth.service';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

export interface menuItem {
  id: number;
  label: string;
  element: string;
}

@Component({
  selector: 'section-navigate',
  imports: [
    CommonModule,
    ButtonModule,
    OverlayPanelModule,
    TranslateModule,
    StyleClass,
    MenuModule,
    AvatarModule
  ],
  templateUrl: './section-navigate.component.html',
  styleUrl: './section-navigate.component.scss'
})
export class SectionNavigate {

  userData = <any>{};
  labelSignIn: string = 'app.button.signin';
  labelSignUp: string = 'app.button.signup';

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

  listMenu: menuItem[] = [
    { id: 1, label: 'app.menu.getStart', element: 'getstarted' },
    { id: 2, label: 'app.menu.features', element: 'features' },
    { id: 3, label: 'app.menu.developers', element: 'team' },
    { id: 3, label: 'app.menu.contact', element: 'contact' },
  ];

  onScrollToElementEvent = output<string>();
  onScrollToElement(element: string): void {
    this.onScrollToElementEvent.emit(element);
  }

  authService = inject(AuthService);
  ngOnInit() {
    this.userData = this.authService.getUserData();

    google.accounts.id.initialize({
      client_id: '346056074798-079u0u6mjr0pc30po19pf6ju5ejdvdnu.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });

    this.renderGoogleButton();
  }

  renderGoogleButton() {
    if (!this.userData) {
      setTimeout(() => {
        google.accounts.id.renderButton(
          document.getElementById("googleSignIn"),
          { theme: "outline", size: "large" }
        );
      }, 100);
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  onSignInEvent = output<any>();
  handleCredentialResponse(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      this.onSignInEvent.emit(payload);
    }
  }

  onSignUpEvent = output<boolean>();
  onSignup(): void {
    this.onSignUpEvent.emit(true);
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

  onSignOut() {
    this.authService.removeToken();
    this.authService.removeUserData();
    this.userData = null;
    this.renderGoogleButton();
  }
}

import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { StyleClass } from 'primeng/styleclass';

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
    StyleClass
  ],
  templateUrl: './section-navigate.component.html',
  styleUrl: './section-navigate.component.scss'
})
export class SectionNavigate {

  labelSignIn: string = 'app.button.signin';
  labelSignUp: string = 'app.button.signup';

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

  onSignInEvent = output<boolean>();
  onSignin(): void {
    this.onSignInEvent.emit(true);
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
}

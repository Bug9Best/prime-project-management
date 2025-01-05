import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { StyleClass } from 'primeng/styleclass';

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

  listMenu: any[] = [
    { id: 1, label: 'SECTION_GET_START', element: 'getstarted' },
    { id: 2, label: 'SECTION_FEATURES', element: 'features' },
    { id: 3, label: 'SECTION_DEVELOPERS', element: 'team' },
  ];

  onScrollToElementEvent = output<string>();
  onScrollToElement(element: string) {
    this.onScrollToElementEvent.emit(element);
  }

  onSignInEvent = output<boolean>();
  onSignin() {
    this.onSignInEvent.emit(true);
  }

  onSignUpEvent = output<boolean>();
  onSignup() {
    this.onSignUpEvent.emit(true);
  }

  @ViewChild('overlay') overlay!: ElementRef;
  onOpenOverlayPanel() {
    this.overlay.nativeElement.style.display = 'block';
  }

  onCloseOverlayPanel() {
    this.overlay.nativeElement.style.display = 'none';
  }

  translateService = inject(TranslateService);
  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.onCloseOverlayPanel();
  }
}

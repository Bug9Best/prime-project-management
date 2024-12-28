import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChaosAuth } from 'ngchaos/auth';
import { ChaosUser } from 'ngchaos/components';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'c-pageUser',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    OverlayPanelModule,
    DividerModule,
    ButtonModule,
    ChaosUser
  ],
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss'
})
export class PageUserComponent {

  public auth = inject(ChaosAuth);
  
  signOut() {
    this.auth.signOut().subscribe();
  }
  
}

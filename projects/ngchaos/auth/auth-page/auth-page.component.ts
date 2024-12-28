import { Component } from '@angular/core';
import { ChaosThemeModule } from 'ngchaos/theme';
import { CommonModule } from '@angular/common';
import { ChaosConfig } from 'ngchaos/core';
import { ChaosAuth } from '../auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'chaos-auth',
  standalone: true,
  imports: [
    CommonModule,
    ChaosThemeModule,
    ButtonModule,
    AvatarModule
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class ChaosAuthPage {

  loading: boolean = true;
  
  constructor(
    public config: ChaosConfig,
    private auth: ChaosAuth,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.signIn(params['code']);
      } else {
        this.loading = false;
      }
    });
    if(this.auth.isLoggedIn()) {
      this.router.navigate([this.config.home]);
    }
  }
  
  login() {
    this.auth.login();
  }
  
  signIn(code: string) {
    this.auth.signInWithCode(code).subscribe({
      next: res => {
        this.messageService.add({
          key: 'app',
          severity: 'success',
          summary: 'ลงชื่อเข้าใช้',
          detail: 'เข้าใช้งานสำเร็จ'
        });
        this.router.navigate([this.config.home]);
      },
      error: err => {
        this.messageService.add({
          key: 'app',
          severity: 'error',
          summary: 'ลงชื่อเข้าใช้',
          detail: err.error.message || 'เกิดข้อผิดพลาด'
        });
      }
    })
  }
  
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'verify-authen',
  imports: [],
  templateUrl: './verify-authen.component.html',
  styleUrl: './verify-authen.component.scss'
})
export class VerifyAuthenPage {

  private token = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
  ) {
    this.activateRoute
      .queryParams.subscribe(params => {
        this.token = params['token'];
        if (!this.token) {
          this.router.navigate(['/home']);
        }
        this.authService.setToken(this.token);
        this.getUser();
      });
  }

  getUser() {
    this.authService.authorization()
      .subscribe({
        next: (res) => {
          this.authService.setUserData(res);
          this.router.navigate(['/workspace']);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}

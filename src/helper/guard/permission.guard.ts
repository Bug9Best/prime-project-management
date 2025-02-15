import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';

export const PermissionGuard: CanActivateFn = () => {

  let authService = inject(AuthService);
  let userService = inject(UserService);

  const user = authService.getUserData() as any;
  let state = false;
  userService
    .checkPermission(user?.id)
    .subscribe({
      next: (response) => {
        if (response.is_disabled) {
          return state = true;
        } else {
          return state = false;
        }
      },
      error: (error) => {
        console.error('PermissionGuard Error:', error);
        return false;
      },
    });

  return state;
};
import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";

export function AppInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let authService = inject(AuthService);
  let token = authService.getToken();
  if (token) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization', `Bearer ${token}`
      ),
    });
  }
  return next(req);
}
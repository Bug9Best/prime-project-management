import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import MyPreset from '../preset/preset';
import { ChaosModule } from 'ngchaos/core';
import { ChaosAuthModule } from 'ngchaos/auth';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    MessageService,
    ConfirmationService,
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      ChaosModule.forRoot({
        appId: 'prime',
        clientId: 'prime',
        title: 'prime',
        subTitle: 'prime project management',
        icon: 'logo.png',
        endpoint: 'http://localhost:8080',
        databaseUrl: 'http://localhost:8080/api',
        authPath: '/auth',
        home: '/home'
      }),
      ChaosAuthModule.forRoot(),
    ]),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.p-dark'
        }
      }
    })
  ]
};


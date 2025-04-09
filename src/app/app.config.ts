import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { httpAccessInterceptor } from './shared/interceptor/http-access.interceptor';
import { provideRouter } from '@angular/router';
import { provideTranslate } from './shared/providers/translate';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpAccessInterceptor])),
    provideTranslate()
  ]
};

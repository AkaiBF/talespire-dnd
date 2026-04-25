import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: "primeng",
            order: "tailwind-base, primeng, tailwind-utilities"
          }
        }
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};

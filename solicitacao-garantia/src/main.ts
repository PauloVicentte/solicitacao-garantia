import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptorsFromDi, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/core/guards/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),

    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([AuthInterceptor])
    ),
    provideRouter(routes),
    provideAnimationsAsync()
  ]
}).catch(err => console.error('Erro ao inicializar aplicação:', err));

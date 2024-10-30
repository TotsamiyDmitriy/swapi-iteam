import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { filmReducer } from './store/film.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { FilmEffects } from './store/film.effects';
import { httpInterceptor } from './interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([httpInterceptor])), provideAnimationsAsync(), provideStore({ film: filmReducer }), provideEffects([FilmEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};

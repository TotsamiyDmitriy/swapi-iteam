import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
 const router = inject(Router)

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 404) {
        router.navigate(['/not-found']);
        return throwError(() => err)
      }
      return throwError(() => err)
}))
};

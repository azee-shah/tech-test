import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ApplicationInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => {
          return error;
        });
      })
    );
  }

  private addToken(request: HttpRequest<any>) {
    const username = 'user';
    const password = 'userPass';

    return request.clone({
      setHeaders: {
        authorization: `Basic ${btoa(username + ':' + password)}`,
      },
    });
  }
}

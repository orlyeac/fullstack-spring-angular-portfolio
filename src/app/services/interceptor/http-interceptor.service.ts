import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }
  
  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string | null = localStorage.getItem('token');
    if (token) {
      let modified: HttpRequest<any> = req.clone(
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token
            }
          )
        }
      );
      return next.handle(modified);
    }
    return next.handle(req);
  }

}

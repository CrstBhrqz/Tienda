import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {TokenService} from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService :TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request) // realiza la logica antes de que salga la peticion
    return next.handle(request);
  }

  private addToken(request : HttpRequest<unknown>){
    const token = this.tokenService.getToken();
    if (token) { // si hay tokan  clona y le añade el token a la cabecera de la peticion url
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return authReq;
    }
    return request; // si no hay token lo deja pasar si añadir nada
  }
}

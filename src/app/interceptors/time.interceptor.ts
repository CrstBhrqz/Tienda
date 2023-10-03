import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken // para determinar que url necesitan el interpector
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() =>false); // por defecto se encuentra false

export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true)
}


@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)) { // si cumple con el contexto mida la el tiempo de respuesta

      const start = performance.now();
      return next.handle(request).pipe(
        tap(() =>{
          const time = (performance.now() - start) + ' ms'+ ' tiempo de respuesta'
          console.log(request.url,time);

        })
      );

    }
    return next.handle(request);

  }
}

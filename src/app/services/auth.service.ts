import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Auth} from '../models/auth.model';
import {User} from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string =`${environment.API_URL}/api/auth`;

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{email, password})

  }

  profile(token:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    console.log(token);


    return this.http.get<User>(`${this.apiUrl}/profile`,{headers})
      //{
      //   Authorization: `Bearer ${token}`, // envio de Token IMPORTANTE  DETERMINAR EL  TIPO (Bearer)y dejar un especio =>> Bearer ${token}
      //   //'Content-Type': 'application/json'  // Se puede enviar informacion en la cabeceraa del mensaje
      // }


  }



}

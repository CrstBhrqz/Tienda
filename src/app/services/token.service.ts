import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token', token);// guardar el token

  }

  getToken(){
    const token = localStorage.getItem('token');// guarda el token
    return token;
  }
}

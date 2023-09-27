import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User,CreateUserDTO } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string =`${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) { }


create(dto:CreateUserDTO ){
  return this.http.post<User>(this.apiUrl,dto) // envia parametros y se espera un objecto tipo USer

}

getAll(){
  return this.http.get<User[]>(this.apiUrl) // envia una peticion get y se espera un array de usuarios
}

}

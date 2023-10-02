import { Component } from '@angular/core';

import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService} from './services/users.service';
import { CreateUserDTO } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token: string = '';

  constructor(
    private authService:AuthService,
    private usersService:UsersService,){
  }


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      email :'cristian@gmail.com',
      password:'123456',
      name: 'cris'
    })
    .subscribe(rta =>{
      console.log(rta);

      })
  }

  login(){
    this.authService.login('cristian@gmail.com', '123456')
    .subscribe(rta =>{
      console.log(rta);
      this.token = rta.access_token;

      })
  }

  getProfile(){
    console.log('token para enviar ', this.token);

    this.authService.profile()
      .subscribe( profile =>{
        console.log(profile);

      }

    )
  }

}

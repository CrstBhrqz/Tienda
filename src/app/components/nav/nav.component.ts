import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service'
import { TokenService } from '../../services/token.service'
import { User } from '../../models/user.model'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token ='';
  profile: User | null= null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('cristian@gmail.com', '123456')
    .subscribe(rta =>{
      console.log(rta);
      this.token = rta.access_token;
      this.getProfile()
    })
  }

  getProfile(){
    console.log('token para enviar ', this.token);

    this.authService.profile()
      .subscribe( user =>{
        this.profile = user;
        console.log(user);

      }

    )
  }


}

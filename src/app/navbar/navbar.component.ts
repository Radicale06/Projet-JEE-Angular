import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private sss:AuthServiceService){
  }
  get username():string{
    return this.sss.getUsername()
  }
  get isLogedIn():boolean{
    return this.sss.isLogedIn()
  }

}

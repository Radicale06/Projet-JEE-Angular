import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Utilisateur } from '../models/utilisateur';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService:AuthServiceService){}
  get user():Utilisateur{
    return this.authService.user
  }
  get isLogedIn():boolean{
    return this.authService.isUserExists
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  active_page = 'student'
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  activateUserPage(userType: string){
    this.active_page = userType;
  }
  
}

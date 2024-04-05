import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  active_page = 'student'
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  activateUserPage(userType: string){
    this.active_page = userType;
  }
  
}

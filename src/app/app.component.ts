import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  hideNavbarAndFooter: boolean = false;
  constructor(private router:Router, private authService: AuthServiceService){}
  ngOnInit() {
    if(this.authService.isUserExists)
      if(localStorage.getItem('type') == 'teacher')
        this.router.navigate(['/teacher'])
      else
        this.router.navigate(['/student'])

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideNavbarAndFooter =  (/^\/quizz\/\d+/).test(event.url);
      }
    });
  }
}
  

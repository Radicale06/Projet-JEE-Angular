import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { router } from 'ngx-bootstrap-icons';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Student } from '../models/student';
import { Utilisateur } from '../models/utilisateur';
import { Teacher } from '../models/teacher';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  active_page = 'student'
  signupForm : FormGroup
  constructor(private http: HttpClient,private toastr:ToastrService,private router:Router, private authService:AuthServiceService){
    this.signupForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  ngOnInit(): void {
    localStorage.setItem('type','student')
  }
  activateUserPage(userType: string){
    this.active_page = userType;
    localStorage.setItem('type','teacher')
  }
  submit() {
    if(! this.signupForm.valid){
      this.toastr.error('Some fields are missing or invalides')
      return
    }
    let userData:Utilisateur = this.signupForm.value
    let asTeacher:boolean = this.active_page == 'teacher' ;
    this.authService.login(userData, asTeacher).subscribe(
    response => {
      this.toastr.success("Login successfully")
      this.authService.saveUser(response)
      asTeacher ? this.router.navigate(['/teacher']) : this.router.navigate(['/student'])
    },
    error => {
      console.error('Error:', );
      if(error.status == 404)
        this.toastr.error("Username ou password incorrecte")
      else
        this.toastr.error("Something Wrong !")
    }
  );
    
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  active_page = 'student'
  signupForm : FormGroup
  constructor(private http: HttpClient,private toastr:ToastrService){
    this.signupForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  activateUserPage(userType: string){
    this.active_page = userType;
  }
  submit() {
    if(! this.signupForm.valid){
      this.toastr.error('Some fields are missing or invalides')
      return
    }
    let userData = this.signupForm.value
    console.log(this.signupForm.value)
    let endpointUrl = 'http://localhost:8080' + (this.active_page == "student" ? "/etudiants":"/professeurs") + "/connect" 
    
    this.http.post(endpointUrl, userData).subscribe(
    response => {
      console.log('API response:', response);
      this.toastr.success("Login successfully")  
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

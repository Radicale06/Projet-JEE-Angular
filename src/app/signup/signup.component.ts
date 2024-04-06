import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent{

  active_page = 'student'
  signupForm : FormGroup
  constructor(private http: HttpClient,private toastr:ToastrService){
    let alpgabetic_validation = [Validators.required, Validators.pattern('^[a-zA-Z]+$')]
    this.signupForm = new FormGroup({
      firstname: new FormControl('',alpgabetic_validation),
      lastname: new FormControl('',alpgabetic_validation),
      email: new FormControl('',[Validators.email]),
      username: new FormControl('',alpgabetic_validation),
      password: new FormControl('',[Validators.required]),
      passwordConf: new FormControl('',[Validators.required]),
      etablissement: new FormControl('',alpgabetic_validation),
      classe_departement: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
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
    console.log('mother')
    let userData = this.signupForm.value
    let classe_dep = userData['classe_departement'];
    this.active_page == 'student'?userData['classe']=classe_dep:userData['departement']=classe_dep
    delete userData['classe_departement']
    delete userData['passwordConf']
    console.log(this.signupForm.value)
    let endpointUrl = 'http://localhost:8080' + (this.active_page == "student" ? "/etudiants":"/professeurs") + "/save" 
    
    this.http.post(endpointUrl, userData).subscribe(
    response => {
      console.log('API response:', response);
      this.toastr.success("Your account has been created")  
    },
    error => {
      console.error('Error:', );
      if(error.status == 409)
        this.toastr.error("Username Already exists")
      else
        this.toastr.error("Something Wrong !")
    }
  );
    
  }
  
}

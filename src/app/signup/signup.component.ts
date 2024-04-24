import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  active_page = 'student'
  signupForm : FormGroup
  constructor(private http: HttpClient,private toastr:ToastrService, private authService : AuthServiceService, private router:Router){
    let alpgabetic_validation = [Validators.required, Validators.pattern('^[a-zA-Z]+$')]
    this.signupForm = new FormGroup({
      firstname: new FormControl('',alpgabetic_validation),
      lastname: new FormControl('',alpgabetic_validation),
      email: new FormControl('',[Validators.required]),
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
    let userData = this.signupForm.value
    console.log('user data: ',userData);
    if(! this.signupForm.valid){
      this.toastr.error('Some fields are missing or invalides')
      return
    }
    
    
    let classe_dep = userData['classe_departement'];
    this.active_page == 'student'?userData['classe']=classe_dep:userData['departement']=classe_dep
    delete userData['classe_departement']
    delete userData['passwordConf']
    let asTeacher = this.active_page == 'teacher'
    this.authService.register(userData,asTeacher).subscribe(
    response => {
      console.log('API response:', response);
      this.toastr.success("Your account has been created")
      this.authService.saveUser(response)
      asTeacher ? this.router.navigate(['/teacher']) : this.router.navigate(['/student'])
    },
    error => {
      console.error('Error:', error);
      if(error.status == 409)
        this.toastr.error("Username Already exists")
      else
        this.toastr.error("Something Wrong !")
    }
  );
    
  }
  
}

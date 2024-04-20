import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { list } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { Quizz } from '../models/quizz';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {

  token: FormControl
  quizzData? : Quizz 
  token_presents = false
  joinedQuizzes: String[] = [];
  constructor(private http:HttpClient,private toastr:ToastrService){
    this.token = new FormControl('')
  }

  onSubmit(){
    console.log(this.token.value);
    
    if(! this.token.valid)
      this.toastr.error('token missed !')
    else{
      this.http.post('http://localhost:8080/etudiants/1/joinquizz/'+this.token.value,null).subscribe(
        (response: any) => {
          this.token_presents = true
          this.token.reset()
          this.quizzData = response
          this.joinedQuizzes.push(this.quizzData!.title)
          console.log(response)
          this.toastr.success("joined")
        },
        error => {
          console.error('Error:', );
          if(error.status == 404)
            this.toastr.error("token invalide")
          else if(error.status == 409)
            this.toastr.info("quizz already taken")
          else if(error.status == 406)
            this.toastr.info("max participations number reached")
          else
            this.toastr.error("Something Wrong !")
        }
      );
    }
  }
}

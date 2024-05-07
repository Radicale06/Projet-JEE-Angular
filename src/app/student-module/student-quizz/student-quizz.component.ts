import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { list } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { Quizz } from '../../models/quizz';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { QuizzAttempt } from '../../models/quizz-attempt';
import { Observable, Subscription } from 'rxjs';
import { Student } from '../../models/student';
import { StudentQuizzServiceService } from '../../student-quizz-service.service';

@Component({
  selector: 'app-student-quizz',
  templateUrl: './student-quizz.component.html',
  styleUrl: './student-quizz.component.css'
})
export class StudentQuizzComponent implements OnDestroy{
  private subscription: Subscription = new Subscription();
  

quitQuizz() {
  this.studentQuizzService.quitQuizz(this.authService.user as Student, this.quizzData!).subscribe(response=>{
    console.log('quit response: ',response);
    this.token_presents = false
  },
error => {
  console.log('quit error: ',error);
})
}

  token: FormControl
  quizzData? : Quizz 
  quizzAttempt?: QuizzAttempt;
  token_presents = false
  constructor(private http:HttpClient,private toastr:ToastrService, private authService: AuthServiceService, 
              private studentQuizzService: StudentQuizzServiceService, private router:Router){
    this.token = new FormControl('')
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    console.log('student ', this.authService.user);
    
    if(! this.token.valid)
      this.toastr.error('token missed !')
    else{
      this.studentQuizzService.joinQuizz(this.authService.user as Student, this.token.value).subscribe(
        response => {
          console.log('response',response);
          
          this.token_presents = true
          this.token.reset()
          this.quizzData = response.quizz
          this.quizzAttempt = response.quizzAttempt
          console.log(response)
          this.toastr.success("joined")
          this.listenForStarting()
        },
        error => {
          console.error('Error:', error);
          this.toastr.error(error.error.message)
        }
      );
    }
  }
  listenForStarting(){
    this.subscription = this.studentQuizzService.checkQuizzStarted(this.quizzData!).subscribe(response =>{
      if(response){
        console.log('quizz started');
        
        this.router.navigate(['quizz',this.quizzData?.id, this.quizzData?.duration],
         {state : { quizzAttempt : this.quizzAttempt, quizz : this.quizzData }})
      }
    })
  }
}
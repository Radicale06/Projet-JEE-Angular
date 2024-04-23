import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { list } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { QuestionsComponent } from '../questions/questions.component';
import { Router } from '@angular/router';
import { TeacherQuizzServiceService } from '../teacher-quizz-service.service';
import { Quizz } from '../models/quizz';
import { AuthServiceService } from '../auth-service.service';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-student-quizz',
  templateUrl: './teacher-home.component.html',
  styleUrl: './teacher-home.component.css'
})
export class TeacherHomeComponent implements OnInit{
  
  actualQuizzId : number = -1;
  displayCurrentQuizz(quizz:Quizz) {
    const serializedQuizz = JSON.stringify(quizz);
    this.router.navigate(['/teacher/progress',quizz.id], {state : { quizz : quizz }});
    this.actualQuizzId = quizz.id;
  }
  displayFinishedQuizz(quizz: Quizz){
    this.router.navigate(['/teacher/finished_quizz',quizz.id], {state : { quizz : quizz }})
    this.actualQuizzId = quizz.id;
  }
  displayReadyQuizz(quizz: Quizz){
    console.log('called',quizz);
    
    this.router.navigate(['/teacher/modifiable_quizz',quizz.id], {state : { quizz : quizz }})
    this.actualQuizzId = quizz.id;
  }
  displayNewQuizz(){
    this.router.navigate(['/teacher'])
    this.actualQuizzId = -1
  }

  
  constructor(private http:HttpClient,private toastr:ToastrService, private router:Router,
     private quizzService: TeacherQuizzServiceService, private authService: AuthServiceService){
    
  }
  ngOnInit(): void {
    this.fetchQuizzes()
  }
  get list_finished_quizzes(): Quizz[]{
    return this.quizzService.finished_quizzes
  }
  get list_current_quizzes(): Quizz[]{
    return this.quizzService.current_quizzes
  }
  get list_ready_quizzes(): Quizz[]{
    return this.quizzService.ready_quizzes
  }

  fetchQuizzes(){
    this.quizzService.fetchQuizzes(this.authService.user as Teacher).subscribe(
      (response: Quizz[]) => {
        console.log(response)
        response.map((quizz:Quizz)=>{
          if(quizz.finished)
            this.quizzService.finished_quizzes.push(quizz)
          else if ( ! quizz.started)
            this.quizzService.ready_quizzes.push(quizz)
          else if (quizz.started && ! quizz.finished)
            this.quizzService.current_quizzes.push(quizz)
        })
      },
      error =>{
        console.log(error)
      }
    )
  }
}

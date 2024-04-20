import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { list } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { QuestionsComponent } from '../questions/questions.component';
import { Router } from '@angular/router';
import { QuizzServiceService } from '../quizz-service.service';
import { Quizz } from '../models/quizz';

@Component({
  selector: 'app-student-home',
  templateUrl: './teacher-home.component.html',
  styleUrl: './teacher-home.component.css'
})
export class TeacherHomeComponent {
  
  actualQuizzId : number = -1;
  displayQuizz(quizz:Quizz) {
    const serializedQuizz = JSON.stringify(quizz);
    this.router.navigate(['/teacher/created_quizz'], { queryParams: { quizz: serializedQuizz } });
    this.actualQuizzId = quizz.id;
  }
  displayNewQuizz(){
    this.router.navigate(['/teacher'])
    this.actualQuizzId = -1
  }

  
  constructor(private http:HttpClient,private toastr:ToastrService, private router:Router, private quizzService: QuizzServiceService){
    this.fetchQuizzes()
    
  }
  get list_finished_quizzes(): Quizz[]{
    return this.quizzService.liste_finished_quizzes
  }
  get list_recent_quizzes(): Quizz[]{
    return this.quizzService.liste_recent_quizzes
  }

  fetchQuizzes(){
    this.quizzService.fetchQuizzes().subscribe(
      (response: Quizz[]) => {
        console.log(response)
        response.map((quizz:Quizz)=>{
          if(quizz.isFinished)
            this.quizzService.add_finished_quizz(quizz)
          else if ( ! quizz.isStarted)
            this.quizzService.add_recent_quizz(quizz)
        })
      },
      error =>{
        console.log(error)
      }
    )
  }
}

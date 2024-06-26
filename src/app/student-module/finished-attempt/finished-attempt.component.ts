import { Component, OnInit } from '@angular/core';
import { StudentQuizzServiceService } from '../../student-quizz-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzAttempt } from '../../models/quizz-attempt';
import { Quizz } from '../../models/quizz';
import { AuthServiceService } from '../../auth-service.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-finished-attempt',
  templateUrl: './finished-attempt.component.html',
  styleUrl: './finished-attempt.component.css'
})
export class FinishedAttemptComponent implements OnInit{

  constructor(private route:ActivatedRoute, private studentQuizzServices:StudentQuizzServiceService, private authService:AuthServiceService, private router:Router){}
  competitorsCount: number = -1;
  score: number = -1;
  questionsCount: number = -1;
  isCheated:boolean = false;
  
  ngOnInit(): void {
    let quizz;

    console.log('History state:', history.state);
    
    this.route.params.subscribe(params => {
      quizz = history.state.quizz as Quizz;
      console.log('Quizz:', quizz);      
      console.log('Quizz Attempt is undefined, fetching...');
      this.fetchQuizzAttempt(this.authService.user as Student, quizz!);

    });
  
  }

private fetchQuizzAttempt(student:Student, quizz:Quizz){
  this.studentQuizzServices.fetchQuizzAttempt(student,quizz).subscribe(response=>{
    this.fetchScoring(response)
  },
  error => {
    console.log('error fetching quizzAttempt: ',error);
  })
}

private fetchScoring(quizzAttempt:QuizzAttempt){
  this.studentQuizzServices.fetchScoring(quizzAttempt).subscribe(response => {
    console.log('scoring response: ',response);
    this.score = response.score
    this.questionsCount = response.questionsCount
    this.competitorsCount = response.competitorsCount
    this.isCheated = response.cheated
    this.router.navigateByUrl(`/finished/${quizzAttempt.id}`, {skipLocationChange: true}).then(() => {
      window.location.href = this.router.url;
    })
  },
error => {
  console.log('scoring error: ',error);
  
})
}

}

import { Component, OnInit } from '@angular/core';
import { Quizz } from '../models/quizz';
import { StudentQuizzServiceService } from '../student-quizz-service.service';
import { Student } from '../models/student';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
displayFinishedQuizz(quizz: Quizz) {
  this.router.navigate(['/student/finished'], {state: {quizz: quizz}});
}
  
  
  constructor(private studentQuizzService:StudentQuizzServiceService, private authService: AuthServiceService,
              private router:Router){}
  ngOnInit(): void {
    this.fetchTakenQuizzes()
  }
  get takenQuizzes():Quizz[]{
    return this.studentQuizzService.takenQuizzes;
  }

  fetchTakenQuizzes(){
    this.studentQuizzService.fetchQuizzes(this.authService.user as Student).subscribe(response => {
      this.studentQuizzService.takenQuizzes = response;
      console.log('fetched:', response);
      console.log('list:',this.takenQuizzes);
      
      
    },
  error => {
    console.log('error from fetching taken quizzes: ',error);
    
  })
  }
}

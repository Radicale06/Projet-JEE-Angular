import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TeacherQuizzServiceService } from '../teacher-quizz-service.service';
import { Quizz } from '../models/quizz';
import { Student } from '../models/student';
import { Utilisateur } from '../models/utilisateur';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prestart-quizz',
  templateUrl: './prestart-quizz.component.html',
  styleUrl: './prestart-quizz.component.css'
})
export class PrestartQuizzComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();

  @Input() quizz?:Quizz;
  liste_etudiants : Student[] = [];
  constructor(private quizzServices:TeacherQuizzServiceService, private router:Router){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.fetchJoinedStudents()
  }

fetchJoinedStudents() {
  this.subscription = this.quizzServices.getJoinedStudents(this.quizz!).subscribe(response => {
      this.liste_etudiants = response
  },
error => {
  console.log('error fetched students: ',error);
})
}

startQuizz(){
  this.quizzServices.startQuizz(this.quizz!).subscribe(
    response => {
      console.log(response);
      this.quizzServices.current_quizzes.push(this.quizz!)
      this.router.navigate(['/teacher/progress',this.quizz!.id], {state: {quizz: this.quizz!}})
    },
    error => {
      console.log(error);
  })
}

}

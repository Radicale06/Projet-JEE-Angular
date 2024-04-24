import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { TeacherQuizzServiceService } from '../teacher-quizz-service.service';
import { QuizzAttempt } from '../models/quizz-attempt';
import { Choice } from '../models/choice';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs';
import { StudentQuizzServiceService } from '../student-quizz-service.service';
import { Quizz } from '../models/quizz';

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrl: './quizz-page.component.css'
})
export class QuizzPageComponent implements OnInit, OnDestroy {

  initialTime : number = 0; // 5 minutes in seconds
    
  quizzAttempt?:QuizzAttempt;
  duration:number = 0;
  // questions type must be modified
  enteredToQuizz = false;
  quizz?:Quizz
  enterToQuizz(){
    this.enteredToQuizz = true
    this.toggleFullscreen()
  }


  questions : any[]=[]
  currentQuestionIndex = 0
  authorizedExit: boolean = false // exit by clicking "finish the quizz"
  currentTime$?: Observable<Date>;
  answeredQuestions : Map<number, Choice[]> = new Map<number, Choice[]>()
  constructor(private http:HttpClient , private route:ActivatedRoute,
     private studentQuizzService: StudentQuizzServiceService, private router:Router,
    @Inject(DOCUMENT) private document: any) {
  }
  ngOnDestroy(): void {
    document.exitFullscreen();
  }
  changePage(previousPage:number, nextPage:number){
    this.currentQuestionIndex = nextPage
    this.setAnswer(previousPage)
  }
  get selectedPage(){return this.currentQuestionIndex;}
  changeClass(choiceindex:number, className:string){
    if(this.questions[this.selectedPage].choices[choiceindex].className == "selected"){
      if(className == "selected")
        this.questions[this.selectedPage].choices[choiceindex].className = "normal"
    }
    else
    this.questions[this.selectedPage].choices[choiceindex].className = className
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fetchQuestions(params['id'])
      this.duration = params['duration']
      this.quizz = history.state.quizz as Quizz
      this.quizzAttempt = history.state.quizzAttempt as QuizzAttempt;
      console.log('quizzAttempt: ',this.quizzAttempt);
      
    });
    this.initialTime = this.duration * 60 ;
    this.currentTime$ = timer(0, 1000).pipe(
      map(() => this.secondsToTime(this.initialTime--))
    );
    


    
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        
        setTimeout(()=>{
          console.log('ta7chelek');
          
            if( ! this.authorizedExit)
              this.finishQuizzAttempt(-1,true);
        },1000)
      }
    }
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);
  }
  toggleFullscreen() {

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  fetchQuestions(quizzId:number){
    this.http.get(`http://localhost:8080/quizzes/${quizzId}/listquestions`).subscribe(
      response => {
        this.questions = response as any[]
        this.questions = this.questions.map((item) => {
          const choices = item.choices.map((choice: any) => ({ text:choice.text, className: "normal", id : choice.id, isCorrect : choice.isCorrect }));
          return {id: item.id, text: item.text,choices: choices };
      });
      },
      error =>{
        console.log(error)
      }
    )
  }
  private secondsToTime(seconds: number): Date {
    return new Date(seconds * 1000);
  }

  finishQuizzAttempt(pageIndex:number ,cheated:boolean | undefined){
    this.authorizedExit = true
    if(cheated == undefined){
      this.setAnswer(pageIndex);
      this.studentQuizzService.takenQuizzes.push(this.quizz!)
    }else{
      this.quizzAttempt!.isCheated = true
      this.reportCheatingAttempt()
    }
    this.router.navigate(['/student/finished',this.quizz!.id], {state: {quizz: this.quizz!}});
  }


  setAnswer(questionIndex: number){
    let choices : Choice[] = []
    let isUpdating: boolean = this.answeredQuestions.has(questionIndex)
    
    
    for(let choice of this.questions[questionIndex].choices){
      if(choice.className === "selected"){
        choices.push(new Choice(choice.id, choice.text, choice.isCorrect, undefined))
      }
    }
    let isDeleting:boolean = isUpdating && choices.length == 0 ;
    if( (! isUpdating && choices.length == 0) || ( ! choicesChanged(choices,this.answeredQuestions.get(questionIndex)!))) // pass the question
      return

    (isDeleting ? this.studentQuizzService.deleteAnswer(this.quizzAttempt!.id, this.questions[questionIndex].id):
      isUpdating ? this.studentQuizzService.updateAnswer(this.quizzAttempt!.id, this.questions[questionIndex].id, choices):
    this.studentQuizzService.setAnswer(this.quizzAttempt!.id, this.questions[questionIndex].id, choices))
    .subscribe(response=>{
      isDeleting ? this.answeredQuestions.delete(questionIndex) : this.answeredQuestions.set(questionIndex,choices)
      console.log('response: ',response);
      
    },
  error => {
    console.log('error: ',error);
  })
  }

  reportCheatingAttempt(){
    this.studentQuizzService.reportCheatingAttempt(this.quizzAttempt!.id).subscribe(response => {
      console.log('success reporting: ',response);
      
    },
    error => {
      console.log('failed reporting: ',error);
      
    })
  }

}

function choicesChanged(choices1: Choice[], choices2: Choice[]): boolean {
  if(choices2 == undefined ||choices1.length != choices2.length)
    return true
  for(let i:number = 0 ;i < choices1.length ; i++)
    if(choices1.at(i)!.id != choices2.at(i)!.id)
      return true
  return false
}

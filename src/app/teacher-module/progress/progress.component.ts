import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quizz } from '../../models/quizz';
import { ActivatedRoute } from '@angular/router';
import { TeacherQuizzServiceService } from '../../teacher-quizz-service.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  quizz?:Quizz

  cases: any[] = []
  progress : any[] = [];
  style_not_entered? : string
  style_passed : string
  style_correct : string
  style_wrong : string
  constructor(private route:ActivatedRoute, private teacherQuizzService:TeacherQuizzServiceService){
    
    this.style_passed = 'background-color: yellow;'
    this.style_correct = 'background-color: green;'
    this.style_wrong = 'background-color: red;'
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getIconPositionStyle(progressList:any[]):string{
    
    let currentQuestionIndex = -1;
    for(let i=progressList.length-1; i>=0; i--){
      if(progressList.at(i) !== null){
        currentQuestionIndex = i;
        break;
      }
    }
    return  `margin-top:1%;margin-left:${(100/this.cases.length)*(currentQuestionIndex+1)}%;transform: translateX(-35%);border: 2px solid #461A42;`

  }
  getCaseStyle(prog:any, index:number):string{
    if (index >= prog.progress.length || prog.progress[index] == null)
      return this.style_not_entered!;
    else if(prog.progress[index])
      return this.style_correct;
    else if ( ! prog.progress[index])
      return this.style_wrong;
    else 
      return this.style_passed
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subscription.unsubscribe();
      this.cases = []
      this.quizz = history.state.quizz as Quizz;
      console.log('quizz: ',this.quizz);
      this.fetchProgress()
      for(let i=0; i<this.quizz!.questions.length;i++)
        this.cases.push(i)
      this.style_not_entered = 'width:'+100/this.cases.length+'%;height:15px;'

    });
    
    
  }

  fetchProgress(){
    this.subscription = this.teacherQuizzService.getProgress(this.quizz!).subscribe(
      response => {
        console.log('progress response: ',response);
        this.progress = response
      },
      error => {
        console.log('progress error: ',error);
      })
  }
}

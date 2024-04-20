import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrl: './quizz-page.component.css'
})
export class QuizzPageComponent implements OnInit {

  // questions type must be modified
  
  isCheating = false;
  questions : any[]=[]
  currentQuestionIndex = 0
  constructor(private http:HttpClient ,
    @Inject(DOCUMENT) private document: any) {
  }
  changePage(page:number){
    this.currentQuestionIndex = page
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
    this.fetchQuestions()
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        this.isCheating = true;
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
  fetchQuestions(){
    this.http.get('http://localhost:8080/quizzes/10/listquestions').subscribe(
      response => {
        console.log(response)
        this.questions = response as any[]
        this.questions = this.questions.map((item) => {
          const choices = item.choices.map((choice: any) => ({ "choice":choice.text, className: "normal" }));
          return { text: item.text, choices };
      });
      console.log(this.questions)
      },
      error =>{
        console.log(error)
      }
    )
  }
}
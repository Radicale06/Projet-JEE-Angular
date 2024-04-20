import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzServiceService } from '../quizz-service.service';
import { NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Question } from '../models/question';
import { Quizz } from '../models/quizz';

@Component({
  selector: 'app-modifiable-quizz',
  templateUrl: './modifiable-quizz.component.html',
  styleUrl: './modifiable-quizz.component.css'
})
export class ModifiableQuizzComponent {
  quizz?: Quizz ;
  questions: Question[] = [];
  hoveredQuestionIndex: number = -1 ;
  hoverStyle = {'visibility':'visible',
  'position': 'absolute',
  'top': '0',
  'left': '0',
  'width': '100%',
  'height': '100%',
  'opacity':'80%',
  'display': 'flex',
  'justify-content': 'center',
  'justify-items': 'center',
  'border': '2px solid #461A42',
  'background-color': '#461A42'};
  notHoveredStyle  = {'width':'0%','weight':'0%'};
  modifyingIndex = -1;
  hoverQuestion(index:number){
    if(this.modifyingIndex == -1)
      this.hoveredQuestionIndex = index
  }
  modify(index:number){
    
    this.modifyingIndex = index;
    this.hoveredQuestionIndex = -1
    
  }
  onReceiveAction(data:any){
    if(data.action === 'save'){
        this.quizzService.updateQuestion(data.newQestion).subscribe(response=>{
          this.toastr.success('question saved')
          this.modifyingIndex = -1;
        console.log('sent data',data.newQestion);
        },
      error =>{
        this.toastr.error('error')
        console.log('sent data',data.newQestion,'\nthe error:', error);
        
      })
    }else if (data.action === 'cancel'){
      this.modifyingIndex = -1;
    }else{
      this.quizzService.deleteQuestion(this.quizz!,data.question).subscribe(response=>{
        this.toastr.success('question deleted')
        this.questions.splice(this.modifyingIndex , 1)
        this.modifyingIndex = -1;
        console.log('response: ',response);
        
      },
    error =>{
      this.toastr.error('error')
      console.log('the error:', error);
      
    })
    }
  }

  constructor(private route: ActivatedRoute, private quizzService: QuizzServiceService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const serializedQuizz = params.get('quizz');
      if (serializedQuizz) {
        this.quizz = JSON.parse(serializedQuizz);
        
        this.quizzService.fetchQuizzQuestions(this.quizz!.id).subscribe((response:Question[]) => {
          this.questions = response;
        });
      }
    });
  }


}

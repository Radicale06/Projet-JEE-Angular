import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherQuizzServiceService } from '../teacher-quizz-service.service';
import { NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Question } from '../models/question';
import { Quizz } from '../models/quizz';
import { Choice } from '../models/choice';

@Component({
  selector: 'app-modifiable-quizz',
  templateUrl: './modifiable-quizz.component.html',
  styleUrl: './modifiable-quizz.component.css'
})
export class ModifiableQuizzComponent {
  quizz?: Quizz ;
  questions: Question[] = [];
  hoveredQuestionIndex: number = -1 ;
  disabled:boolean = false
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
  addQuestion(){
    let newQuestion:Question = new Question(undefined,"",this.quizz?.id);
    newQuestion.choices.push(new Choice(undefined,'',false,undefined))
    this.questions.push(newQuestion)
    this.modifyingIndex = this.questions.length - 1
  }
  openToJoin(){
    this.quizzService.openForParticipation(this.quizz!).subscribe(response=>{
      this.toastr.success('quizz opened for students')
      this.disabled = true
    },
  error => {
    this.toastr.error('error')
  })
  }
  onReceiveAction(data:any){
    if(data.action === 'save' && data.newQestion.id === undefined){
      // it's a new created question not present in the DB, so we need to create it
      this.quizzService.createQuestion(this.quizz!,data.newQestion).subscribe((response:Question)=>{
        data.newQestion.id = response.id
        this.toastr.success('question created')
        this.modifyingIndex = -1;
      console.log('sent data',data.newQestion);
      },
    error =>{
      this.toastr.error('error')
      console.log('sent data',data.newQestion,'\nthe error:', error);
      
    })

    }
    else if(data.action === 'save'){
        this.quizzService.updateQuestion(data.newQestion).subscribe(response=>{
          this.toastr.success('question saved')
          this.modifyingIndex = -1;
        console.log('sent data',data.newQestion);
        },
      error =>{
        this.toastr.error('error')
        console.log('sent data',data.newQestion,'\nthe error:', error);
        
      })
    }else if (data.action === 'cancel' && data.question.id === undefined){
      this.questions.pop()
      this.modifyingIndex = -1;
    }else if (data.action === 'cancel'){
      this.modifyingIndex = -1;
    }else if (data.action === 'remove' && data.question.id === undefined){
      // it's a new created Question in UI and not present on the DB, so we need just to remove it from the UI
      this.toastr.success('question deleted')
      this.questions.splice(this.modifyingIndex , 1)
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

  constructor(private route: ActivatedRoute, private quizzService: TeacherQuizzServiceService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizz = history.state.quizz as Quizz;
      this.quizzService.fetchQuizzQuestions(this.quizz!.id).subscribe((response:Question[]) => {
        this.questions = response;
      });
    });this.disabled = this.quizz!.started
    console.log('quizz: ',this.quizz,'disabled',this.disabled);
    
  }


}

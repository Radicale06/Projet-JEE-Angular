import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TeacherQuizzServiceService } from '../teacher-quizz-service.service';
import { Router } from '@angular/router';
import { Quizz } from '../models/quizz';
import { Question } from '../models/question';
import { Choice } from '../models/choice';
import { AuthServiceService } from '../auth-service.service';
import { Teacher } from '../models/teacher';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questionsForm: any = null ;


  
  get liste_quizzes(): any[]{
    return this.teacherQuizzService.current_quizzes.concat(this.teacherQuizzService.finished_quizzes).concat(this.teacherQuizzService.ready_quizzes);
  }
  fillWithExistingQuizz(quizz: Quizz) {
    this.questionsForm = this.fb.group({
      title: [quizz.title],
      duration: [quizz.duration],
      token: [Math.random().toString().substring(2, 10)],
      maxParticipations: [quizz.maxParticipations],
      questions: this.fb.array([])
    });
    this.fillQuestions(quizz.id);
  }
  createEmptyQuizz(){
    this.questionsForm = this.fb.group({
      title: new FormControl(''),
      duration: new FormControl(5),
      token: new FormControl(Math.random().toString().substring(2,10)),
      maxParticipations: new FormControl(15),
      questions: this.fb.array([])
    });
    this.addQuestion();
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr:ToastrService,
     private teacherQuizzService:TeacherQuizzServiceService, private router:Router, private authService: AuthServiceService) {
    this.createEmptyQuizz()
  }

  ngOnInit() {}

  questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
  questionChoices(questionIndex: number): FormArray{
    return this.questions().at(questionIndex).get('choices') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      text: '',
      choices: this.fb.array([
        this.fb.group({
          text: '',
          isCorrect: false
        })
      ])
    });
    this.questions().push(question);
  }

  removeQuestion(index: number) {
    this.questions().removeAt(index);
  }

  addChoice(questionIndex: number) {
    this.questionChoices(questionIndex).push(this.createChoice('',false));
  }

  removeChoice(questionIndex: number, choiceIndex: number) {
    this.questionChoices(questionIndex).removeAt(choiceIndex);
  }

  createChoice(text:string, isCorrect:boolean): FormGroup {
    return this.fb.group({
      text: text,
      isCorrect: isCorrect
    });
  }

  
  saveQuestions() {
      this.teacherQuizzService.createQuizz(this.authService.user as Teacher ,this.questionsForm.value).subscribe(
        (response:Quizz) => {
          console.log('API response:', response);
          this.toastr.success('questions added')
          let param = JSON.stringify(response)
          this.teacherQuizzService.ready_quizzes.push(response)
          this.router.navigate(['/teacher/modifiable_quizz',response.id], { state: { quizz: response } });
          
        },
        error => {
          if(error.status == 404)
            this.toastr.error('error')
          console.log('API error:', error);
          this.toastr.error('something wrong')
        }
      );
      
  }
  fillQuestions(quizzId: number){
    this.questions().clear()
    this.teacherQuizzService.fetchQuizzQuestions(quizzId).subscribe(
      (response: Question[]) => {
        console.log(response);
        response.map((question: Question)=>{
          const choicesArray = this.fb.array(
            question.choices.map((choice: Choice)=>{
              return (this.createChoice(choice.text,choice.isCorrect));
            })
          );
          const questionForm = this.fb.group({
            text: question.text,
            choices: choicesArray
          });
          this.questions().push(questionForm)
        });
      console.log(this.questions())
      },
      error =>{
        console.log(error)
      }
    )
  }
}


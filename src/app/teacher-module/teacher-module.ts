
import { NgModule } from '@angular/core';
import {QuestionsComponent} from './questions/questions.component'
import {TeacherHomeComponent} from './teacher-home/teacher-home.component'
import {ProgressComponent} from './progress/progress.component'
import {PrestartQuizzComponent} from './prestart-quizz/prestart-quizz.component'
import {CreatedQuizzComponent} from './created-quizz/created-quizz.component'
import {ModifiableQuizzComponent} from './modifiable-quizz/modifiable-quizz.component'
import {ModifiableQuestionComponent} from './modifiable-question/modifiable-question.component'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionsComponent,
    TeacherHomeComponent,
    ProgressComponent,
    PrestartQuizzComponent,
    CreatedQuizzComponent,
    ModifiableQuizzComponent,
    ModifiableQuestionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]

  
})
export class TeacherModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishedAttemptComponent} from './finished-attempt/finished-attempt.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentQuizzComponent } from './student-quizz/student-quizz.component';
import { AppRoutingModule, routes } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FinishedAttemptComponent,
    StudentDashboardComponent,
    QuizzPageComponent,
    StudentQuizzComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class StudentModule { }

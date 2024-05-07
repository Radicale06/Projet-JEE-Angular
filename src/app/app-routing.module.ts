import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { QuizzPageComponent } from './student-module/quizz-page/quizz-page.component';
import { QuestionsComponent } from './teacher-module/questions/questions.component';
import { TeacherHomeComponent } from './teacher-module/teacher-home/teacher-home.component';
import { StudentQuizzComponent } from './student-module/student-quizz/student-quizz.component';
import { CreatedQuizzComponent } from './teacher-module/created-quizz/created-quizz.component';
import { ModifiableQuizzComponent } from './teacher-module/modifiable-quizz/modifiable-quizz.component';
import { ProgressComponent } from './teacher-module/progress/progress.component';
import { FinishedAttemptComponent } from './student-module/finished-attempt/finished-attempt.component';
import { StudentDashboardComponent } from './student-module/student-dashboard/student-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'teacher',component:TeacherHomeComponent, children: [
    {path: '', component: QuestionsComponent},
    {path: 'finished_quizz/:id', component: CreatedQuizzComponent},
    {path: 'modifiable_quizz/:id', component: ModifiableQuizzComponent},
    {path: 'progress/:id', component: ProgressComponent}
  ]},
  {path:'student',component:StudentDashboardComponent, children:[
    {path: '', component: StudentQuizzComponent},
    {path: 'finished/:id', component: FinishedAttemptComponent}
  ]},
  {path:'quizz/:id/:duration',component:QuizzPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

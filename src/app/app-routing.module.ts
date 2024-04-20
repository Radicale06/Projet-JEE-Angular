import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { QuestionsComponent } from './questions/questions.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { CreatedQuizzComponent } from './created-quizz/created-quizz.component';
import { ModifiableQuizzComponent } from './modifiable-quizz/modifiable-quizz.component';

const routes: Routes = [
  {path:'',component:SignupComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'teacher',component:TeacherHomeComponent, children: [
    {path: '', component: QuestionsComponent},
    {path: 'created_quizz', component: CreatedQuizzComponent, data: {queryParams : 'quizz'}},
    {path: 'modifiable_quizz', component: ModifiableQuizzComponent, data: {queryParams : 'quizz'}}
  ]},
  {path:'student',component:StudentHomeComponent},
  {path:'quizz',component:QuizzPageComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

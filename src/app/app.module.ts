import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { StudentQuizzComponent } from './student-quizz/student-quizz.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { QuestionsComponent } from './questions/questions.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { ProgressComponent } from './progress/progress.component';
import { PrestartQuizzComponent } from './prestart-quizz/prestart-quizz.component';
import { CreatedQuizzComponent } from './created-quizz/created-quizz.component';
import { ModifiableQuizzComponent } from './modifiable-quizz/modifiable-quizz.component';
import { ModifiableQuestionComponent } from './modifiable-question/modifiable-question.component';
import { FinishedAttemptComponent } from './finished-attempt/finished-attempt.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    StudentQuizzComponent,
    QuizzPageComponent,
    QuestionsComponent,
    TeacherHomeComponent,
    ProgressComponent,
    PrestartQuizzComponent,
    CreatedQuizzComponent,
    ModifiableQuizzComponent,
    ModifiableQuestionComponent,
    FinishedAttemptComponent,
    StudentDashboardComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxBootstrapIconsModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      timeOut: 3000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

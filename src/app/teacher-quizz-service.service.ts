import { HttpClient } from '@angular/common/http';
import { BootstrapOptions, Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { Quizz } from './models/quizz';
import { Question } from './models/question';
import { Student } from './models/student';
import { Choice } from './models/choice';
import { QuizzAttempt } from './models/quizz-attempt';
import { Teacher } from './models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherQuizzServiceService {

  constructor(private http:HttpClient) { }

  finished_quizzes : Quizz[] = []
  current_quizzes : Quizz[] = []
  ready_quizzes : Quizz[] = []

  
  fetchQuizzQuestions(quizzId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`http://192.168.1.14:8080/quizzes/${quizzId}/listquestions`);
  }
  fetchQuizzes(teacher:Teacher): Observable<Quizz[]>{
    this.finished_quizzes = []
    this.current_quizzes = []
    this.ready_quizzes = []
    return this.http.get<Quizz[]>(`http://192.168.1.14:8080/professeurs/${teacher.id}/createdquizzes`);
  }

  createQuizz(teacher:Teacher ,quizz : Quizz): Observable<Quizz>{
    return this.http.post<Quizz>(`http://192.168.1.14:8080/quizzes/${teacher.id}/createquizz`, quizz);
  }
  createQuestion(quizz : Quizz, question: Question): Observable<Question>{
    return this.http.post<Question>(`http://192.168.1.14:8080/quizzes/${quizz.id}/createquestion`, question);
  }
  deleteQuestion(quizz:Quizz,question : Question): Observable<any>{
    return this.http.delete(`http://192.168.1.14:8080/quizzes/${quizz.id}/deletequestion/${question.id}`);
  }
  updateQuestion(newQuestion : Question): Observable<any>{
    return this.http.patch("http://192.168.1.14:8080/quizzes/updatequestion",newQuestion);
  }
  openForParticipation(quizz:Quizz): Observable<any>{
    return this.http.patch(`http://192.168.1.14:8080/quizzes/open/${quizz.id}`,null);
  }
  getJoinedStudents(quizz:Quizz): Observable<Student []>{
    return interval(2500).pipe(
      switchMap(() => this.http.get<Student []>(`http://192.168.1.14:8080/quizzes/joinedStudents/${quizz.id}`)));
  }
  getProgress(quizz:Quizz): Observable<any>{
    return interval(2500).pipe(
      switchMap(() => this.http.get<any>(`http://192.168.1.14:8080/quizzes/progress/${quizz.id}`)));
  }
  startQuizz(quizz:Quizz):Observable<any>{
    return this.http.patch(`http://192.168.1.14:8080/quizzes/startquizz/${quizz.id}`,null);
  }

  
}

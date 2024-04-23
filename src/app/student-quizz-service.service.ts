import { Injectable } from '@angular/core';
import { Quizz } from './models/quizz';
import { HttpClient } from '@angular/common/http';
import { QuizzAttempt } from './models/quizz-attempt';
import { Observable, interval, switchMap } from 'rxjs';
import { Student } from './models/student';
import { Choice } from './models/choice';

@Injectable({
  providedIn: 'root'
})
export class StudentQuizzServiceService {

  takenQuizzes: Quizz[] = [];

  

  constructor(private http:HttpClient) { }

  fetchQuizzAttempt(student:Student, quizz:Quizz):Observable<QuizzAttempt>{
    return this.http.get<QuizzAttempt>(`http://localhost:8080/quizzes/${quizz.id}/get_attempt/${student.id}`);
  }
  fetchQuizzes(student:Student):Observable<Quizz[]>{
    this.takenQuizzes = []
    return this.http.get<Quizz[]>(`http://localhost:8080/etudiants/${student.id}/taken_quizzes`);
  }
  fetchScoring(quizzAttempt:QuizzAttempt):Observable<any> {
    return this.http.get<any>(`http://localhost:8080/quizzattempts/${quizzAttempt.id}/scoring`);
  }

  joinQuizz(student:Student, token:number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/quizzes/${student.id}/joinquizz/${token}`,null);
  }
  quitQuizz(student:Student, quizz:Quizz):Observable<any>{
    return this.http.post(`http://localhost:8080/quizzes/${student.id}/quitquizz/${quizz.id}`,null);
  }
  checkQuizzStarted(quizz:Quizz):Observable<boolean>{
    return interval(2500).pipe(
      switchMap(() => this.http.get<boolean>(`http://localhost:8080/quizzes/is_started/${quizz.id}`)));
  }
  setAnswer(quizzAttemptId:number, questionId:number, choices: Choice[]):Observable<any>{
    return this.http.post(`http://localhost:8080/quizzattempts/${quizzAttemptId}/setanswer/${questionId}`,choices)
  }
  updateAnswer(quizzAttemptId:number, questionId:number, choices: Choice[]):Observable<any>{
    console.log("updating");
    return this.http.put(`http://localhost:8080/quizzattempts/${quizzAttemptId}/updateanswer/${questionId}`,choices)
  }
  deleteAnswer(quizzAttemptId:number, questionId:number):Observable<any>{
    console.log("deleting");
    
    return this.http.delete(`http://localhost:8080/quizzattempts/${quizzAttemptId}/deleteanswer/${questionId}`)
  }
  reportCheatingAttempt(quizzAttemptId: number):Observable<any>{
    return this.http.patch(`http://localhost:8080/quizzattempts/${quizzAttemptId}/report_cheating_attempt`,null)
  }
}

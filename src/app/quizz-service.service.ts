import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quizz } from './models/quizz';
import { Question } from './models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizzServiceService {

  constructor(private http:HttpClient) { }

  liste_finished_quizzes : Quizz[] = []
  liste_recent_quizzes : Quizz[] = []

  add_finished_quizz(quizz: Quizz){
    this.liste_finished_quizzes.push(quizz)
  }
  add_recent_quizz(quizz: Quizz){
    this.liste_recent_quizzes.push(quizz)
  }
  fetchQuizzQuestions(quizzId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`http://localhost:8080/quizzes/${quizzId}/listquestions`);
  }
  fetchQuizzes(): Observable<Quizz[]>{
    this.liste_finished_quizzes = []
    this.liste_recent_quizzes = []
    return this.http.get<Quizz[]>('http://localhost:8080/professeurs/2/createdquizzes');
  }

  createQuizz(quizz : Quizz): Observable<Quizz>{
    return this.http.post<Quizz>("http://localhost:8080/quizzes/2/createquizz", quizz);
  }
  deleteQuestion(quizz:Quizz,question : Question): Observable<Object>{
    return this.http.delete(`http://localhost:8080/quizzes/${quizz.id}/deletequestion/${question.id}`);
  }
  updateQuestion(newQuestion : Question): Observable<Object>{
    return this.http.patch("http://localhost:8080/quizzes/updatequestion",newQuestion);
  }

  
}

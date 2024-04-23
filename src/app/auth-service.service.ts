import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models/student';
import { Teacher } from './models/teacher';
import { Utilisateur } from './models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private _user? : Utilisateur
  logedIn : boolean = false

  constructor(private http:HttpClient) {   }


  

  get isUserExists(): boolean{
    let user = localStorage.getItem('user');
    return user != null
  }

  saveUser(user:Utilisateur){
    this._user = user
    const jsonString = JSON.stringify(user);
    localStorage.setItem('user', jsonString);
  }
  logOut(){
    localStorage.removeItem('user')
  }

  get user(): Utilisateur{
    if( ! this._user){
      const jsonString = localStorage.getItem('user');
      this._user = JSON.parse(jsonString!);
    }
    return this._user!
  }

  
  login(student: Utilisateur, asTeacher:boolean):Observable<Utilisateur>{
    return asTeacher ? this.http.post<Teacher>('http://localhost:8080/professeurs/connect', student) :
        this.http.post<Student>('http://localhost:8080/etudiants/connect', student);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  username : string
  id : string
  classe : string
  etablissement : string
  constructor(private http:HttpClient) {
    this.username = this.id = this.classe = this.etablissement = ""
   }
  isLogedIn(): boolean{
    return localStorage.getItem('token') != null;
  }
  getUsername(): string{
      return this.username;
  }


  fetchCredentials(etudiantId: number) {
    const rememberMeToken = localStorage.getItem('token');
    if (rememberMeToken) {
        const headers = new HttpHeaders().set('rememberMeToken', rememberMeToken);
        this.http.get(`http://localhost:8080/etudiants/credentials/1`, { headers }).subscribe(
          (response:any) => {
            this.username = response.username
            this.id = response.id
            this.classe = response.classe
            console.log(response); 
          },
          error => {
            console.log(error); 
          }
        );
    }
}
}

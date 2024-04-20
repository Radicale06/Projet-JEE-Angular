import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private http:HttpClient){

  }
}

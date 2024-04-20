import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  kk=[5,10,70,80,5,5,5,5,5,5]
  bb: any[] = []
  progress : number;
  style_not_entered : string
  style_passed : string
  style_answered : string
  style_actual : string
  icon_style: string;
  constructor(){
    for(let i=0; i<60;i++)
      this.bb.push(i)
    this.progress = 1
    this.style_not_entered = 'width:'+100/this.bb.length+'%;height:15px;'
    this.style_passed = 'background-color: red;width:'+100/this.bb.length+'%;height:15px;'
    this.style_answered = 'background-color: #461A42;width:'+100/this.bb.length+'%;height:15px;'
    this.style_actual = 'background-color: #461A42;width:'+100/this.bb.length+'%;height:15px;'
    this.icon_style = `margin-top:1%;margin-left:${0}%;border-radius:50%;transform: translateX(-35%);border: 2px solid #461A42;`
  }
  incProgress(){
    if(this.progress < this.bb.length)
      this.progress++
    this.icon_style = `margin-top:1%;margin-left:${(100/this.bb.length)*(this.progress-1)}%;border-radius:50%;transform: translateX(-35%);`
  }
}

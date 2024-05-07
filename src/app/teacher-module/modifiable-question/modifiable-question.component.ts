import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Question } from '../../models/question';
import { Choice } from '../../models/choice';

@Component({
  selector: 'app-modifiable-question',
  templateUrl: './modifiable-question.component.html',
  styleUrl: './modifiable-question.component.css'
})
export class ModifiableQuestionComponent implements OnInit{

  @Input() question? : Question;
  @Output() questionChanged = new EventEmitter<any>();

  questionForm : any;

  constructor(private fb:FormBuilder,private toastr:ToastrService){
    
  }
  save(){
    if(this.checkChanges()){
      let newQestion:Question = this.question!
      newQestion.text = this.questionForm.value.questionText
      newQestion.choices = []
      this.questionForm.value.choices.forEach((choice:any)=>{
        newQestion.choices.push(new Choice(null!,choice.choiceText,choice.isCorrect,null!));
      });
      this.questionChanged.emit({'action':'save','newQestion':newQestion});
    }
    else
      this.cancel()
  }
  cancel(){
    this.questionChanged.emit({'action':'cancel','question':this.question});
  }
  remove(){
    console.log('rrrrr: ',this.question?.id);
    
    this.questionChanged.emit({'action':'remove','question':this.question});
  }
  checkChanges():boolean{
    let newData = this.questionForm.value
    if (newData.questionText !== this.question!.text)
      return true
    if(newData.choices.length !== this.question!.choices.length)
      return true
    for(let choiceIndex = 0 ; choiceIndex < (newData.choices as []).length; choiceIndex ++){

      if (newData.choices.at(choiceIndex).choiceText !== this.question!.choices[choiceIndex].text)
        return true
      if (newData.choices.at(choiceIndex).isCorrect !== this.question!.choices[choiceIndex].isCorrect)
        return true
    }
    return false
  }
  ngOnInit(): void {
    
    this.questionForm = this.fb.group({
      questionText : this.question!.text,
      choices : this.fb.array([])
    })
    const choicesFormArray = this.questionForm.get('choices') as FormArray;
    this.question!.choices.forEach((choice:Choice) => {
      choicesFormArray.push(this.fb.group({
        choiceText: choice.text,
        isCorrect: choice.isCorrect
      }));
    });
  }

  get questionChoices(): FormArray{
    return this.questionForm.get('choices') as FormArray;
  }
  addChoice() {
    this.questionChoices.push(this.createChoice('',false));
  }

  removeChoice(choiceIndex: number) {
    this.questionChoices.removeAt(choiceIndex);
  }
  createChoice(text:string, isCorrect:boolean): FormGroup {
    return this.fb.group({
      choiceText: text,
      isCorrect: isCorrect
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { list } from 'ngx-bootstrap-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {

  token: FormControl
  quizzData ={
    'quizz_title':String,
    'teacher_name':String,
    'duration':String,
    'questions_count':String,
    'max_participations':String
  }
  joinedQuizzes : String[] = ["spark ecosystem (hadj taieb)", "java (ben aouicha)", "NoSQL (Ghazi)", "Hadoop MapReduce (Montassar)"]
  token_presents = false
  constructor(private http:HttpClient,private toastr:ToastrService){
    this.token = new FormControl('')
  }

  onSubmit(){
    console.log(this.token.value);
    
    if(! this.token.valid)
      this.toastr.error('token missed !')
    else{
      this.http.post('http://localhost:8080/etudiants/1/joinquizz/'+this.token.value,null).subscribe(
        (response: any) => {
          this.token_presents = true
          this.token.reset()
          this.quizzData = {
            'quizz_title':response.quizzTitle,
            'teacher_name':response.teacherName,
            'duration':response.duration,
            'questions_count':response.questionsCount,
            'max_participations':response.maxParticipations
          }
          this.joinedQuizzes.push(this.quizzData.quizz_title+` (${this.quizzData.teacher_name})`)
          console.log(response)
          this.toastr.success("joined")
        },
        error => {
          console.error('Error:', );
          if(error.status == 404)
            this.toastr.error("token invalide")
          else if(error.status == 409)
            this.toastr.info("quizz already taken")
          else if(error.status == 406)
            this.toastr.info("max participations number reached")
          else
            this.toastr.error("Something Wrong !")
        }
      );
    }
  }
}

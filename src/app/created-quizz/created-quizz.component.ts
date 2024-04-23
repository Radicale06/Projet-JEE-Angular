import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherQuizzServiceService } from '../teacher-quizz-service.service';
import { Question } from '../models/question';
import { Quizz } from '../models/quizz';

@Component({
  selector: 'app-created-quizz',
  templateUrl: './created-quizz.component.html',
  styleUrl: './created-quizz.component.css'
})
export class CreatedQuizzComponent {
  quizz?: Quizz ;
  questions?: Question[];
  constructor(private route: ActivatedRoute, private quizzService: TeacherQuizzServiceService) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizz = history.state.quizz as Quizz;
      console.log('quizz: ',this.quizz);
      this.quizzService.fetchQuizzQuestions(this.quizz!.id).subscribe((response:Question[]) => {
        this.questions = response;
      });
    });
  }
}

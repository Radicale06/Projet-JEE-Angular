import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzServiceService } from '../quizz-service.service';
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
  constructor(private route: ActivatedRoute, private quizzService: QuizzServiceService) { 
    console.log('called');
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const serializedQuizz = params.get('quizz');
      if (serializedQuizz) {
        this.quizz = JSON.parse(serializedQuizz);
        this.quizzService.fetchQuizzQuestions(this.quizz!.id).subscribe(response => {
          this.questions = response;
        });
      }
    });
  }
}

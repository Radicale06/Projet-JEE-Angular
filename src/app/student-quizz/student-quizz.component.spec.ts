import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizzComponent } from './student-quizz.component';

describe('StudentQuizzComponent', () => {
  let component: StudentQuizzComponent;
  let fixture: ComponentFixture<StudentQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentQuizzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

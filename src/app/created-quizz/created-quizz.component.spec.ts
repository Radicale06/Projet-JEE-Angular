import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedQuizzComponent } from './created-quizz.component';

describe('CreatedQuizzComponent', () => {
  let component: CreatedQuizzComponent;
  let fixture: ComponentFixture<CreatedQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatedQuizzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

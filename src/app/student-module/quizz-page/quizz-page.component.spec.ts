import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzPageComponent } from './quizz-page.component';

describe('QuizzPageComponent', () => {
  let component: QuizzPageComponent;
  let fixture: ComponentFixture<QuizzPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizzPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizzPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

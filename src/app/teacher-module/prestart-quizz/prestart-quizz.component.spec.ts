import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestartQuizzComponent } from './prestart-quizz.component';

describe('PrestartQuizzComponent', () => {
  let component: PrestartQuizzComponent;
  let fixture: ComponentFixture<PrestartQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestartQuizzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestartQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

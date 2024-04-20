import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiableQuestionComponent } from './modifiable-question.component';

describe('ModifiableQuestionComponent', () => {
  let component: ModifiableQuestionComponent;
  let fixture: ComponentFixture<ModifiableQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifiableQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifiableQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

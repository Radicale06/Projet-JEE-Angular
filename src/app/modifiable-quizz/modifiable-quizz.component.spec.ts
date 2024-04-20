import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiableQuizzComponent } from './modifiable-quizz.component';

describe('ModifiableQuizzComponent', () => {
  let component: ModifiableQuizzComponent;
  let fixture: ComponentFixture<ModifiableQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifiableQuizzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifiableQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

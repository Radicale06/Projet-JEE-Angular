import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedAttemptComponent } from './finished-attempt.component';

describe('FinishedAttemptComponent', () => {
  let component: FinishedAttemptComponent;
  let fixture: ComponentFixture<FinishedAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishedAttemptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

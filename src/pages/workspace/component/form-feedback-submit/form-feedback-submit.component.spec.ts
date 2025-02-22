import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFeedbackSubmit } from './form-feedback-submit.component';

describe('FormFeedbackSubmit', () => {
  let component: FormFeedbackSubmit;
  let fixture: ComponentFixture<FormFeedbackSubmit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFeedbackSubmit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFeedbackSubmit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

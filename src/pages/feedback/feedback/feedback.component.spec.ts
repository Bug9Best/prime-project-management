import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPage } from './feedback.component';

describe('FeedbackPage', () => {
  let component: FeedbackPage;
  let fixture: ComponentFixture<FeedbackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

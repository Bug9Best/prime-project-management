import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackContentPage } from './feedback-content.component';

describe('FeedbackContentPage', () => {
  let component: FeedbackContentPage;
  let fixture: ComponentFixture<FeedbackContentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackContentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

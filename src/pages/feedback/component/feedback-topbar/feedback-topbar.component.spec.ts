import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTopbar } from './feedback-topbar.component';

describe('FeedbackTopbar', () => {
  let component: FeedbackTopbar;
  let fixture: ComponentFixture<FeedbackTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

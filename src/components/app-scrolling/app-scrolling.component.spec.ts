import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppScrolling } from './app-scrolling.component';

describe('AppScrolling', () => {
  let component: AppScrolling;
  let fixture: ComponentFixture<AppScrolling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppScrolling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppScrolling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

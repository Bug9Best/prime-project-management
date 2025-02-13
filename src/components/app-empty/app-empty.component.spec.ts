import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEmpty } from './app-empty.component';

describe('AppEmpty', () => {
  let component: AppEmpty;
  let fixture: ComponentFixture<AppEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEmpty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEmpty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

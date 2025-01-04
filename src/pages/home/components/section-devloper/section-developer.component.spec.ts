import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDeveloper } from './section-developer.component';

describe('SectionDeveloper', () => {
  let component: SectionDeveloper;
  let fixture: ComponentFixture<SectionDeveloper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDeveloper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDeveloper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

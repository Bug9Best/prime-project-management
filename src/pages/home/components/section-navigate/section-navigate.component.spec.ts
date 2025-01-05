import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNavigate } from './section-navigate.component';

describe('SectionNavigate', () => {
  let component: SectionNavigate;
  let fixture: ComponentFixture<SectionNavigate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionNavigate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionNavigate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

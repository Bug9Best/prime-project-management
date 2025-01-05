import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGetstart } from './section-getstart.component';

describe('SectionGetstart', () => {
  let component: SectionGetstart;
  let fixture: ComponentFixture<SectionGetstart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionGetstart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionGetstart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

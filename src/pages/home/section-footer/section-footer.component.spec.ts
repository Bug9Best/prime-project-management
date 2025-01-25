import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFooter } from './section-footer.component';

describe('SectionFooter', () => {
  let component: SectionFooter;
  let fixture: ComponentFixture<SectionFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

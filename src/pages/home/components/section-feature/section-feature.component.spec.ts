import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFeature } from './section-feature.component';

describe('SectionFeature', () => {
  let component: SectionFeature;
  let fixture: ComponentFixture<SectionFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

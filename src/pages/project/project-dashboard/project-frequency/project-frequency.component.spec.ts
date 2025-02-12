import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFrequency } from './project-frequency.component';

describe('ProjectFrequency', () => {
  let component: ProjectFrequency;
  let fixture: ComponentFixture<ProjectFrequency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFrequency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFrequency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

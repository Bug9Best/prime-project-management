import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprint } from './project-sprint.component';

describe('ProjectSprint', () => {
  let component: ProjectSprint;
  let fixture: ComponentFixture<ProjectSprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSprint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSprint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

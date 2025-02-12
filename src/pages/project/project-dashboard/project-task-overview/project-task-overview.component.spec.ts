import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskOverview } from './project-task-overview.component';

describe('ProjectTaskOverview', () => {
  let component: ProjectTaskOverview;
  let fixture: ComponentFixture<ProjectTaskOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskList } from './project-task-list.component';

describe('ProjectTaskList', () => {
  let component: ProjectTaskList;
  let fixture: ComponentFixture<ProjectTaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

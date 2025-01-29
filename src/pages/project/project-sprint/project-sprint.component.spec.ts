import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintComponent } from './project-sprint.component';

describe('ProjectSprintComponent', () => {
  let component: ProjectSprintComponent;
  let fixture: ComponentFixture<ProjectSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintDetailComponent } from './project-sprint-detail.component';

describe('ProjectSprintDetailComponent', () => {
  let component: ProjectSprintDetailComponent;
  let fixture: ComponentFixture<ProjectSprintDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSprintDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSprintDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

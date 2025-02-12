import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberPosition } from './project-member-position.component';

describe('ProjectMemberPosition', () => {
  let component: ProjectMemberPosition;
  let fixture: ComponentFixture<ProjectMemberPosition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberPosition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMemberPosition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMember } from './project-member.component';

describe('ProjectMember', () => {
  let component: ProjectMember;
  let fixture: ComponentFixture<ProjectMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMember]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

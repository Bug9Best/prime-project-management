import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberInvite } from './project-member-invite.component';

describe('ProjectMemberInvite', () => {
  let component: ProjectMemberInvite;
  let fixture: ComponentFixture<ProjectMemberInvite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberInvite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMemberInvite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

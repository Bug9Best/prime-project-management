import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberDetail } from './project-member-detail.component';

describe('ProjectMemberDetail', () => {
  let component: ProjectMemberDetail;
  let fixture: ComponentFixture<ProjectMemberDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMemberDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

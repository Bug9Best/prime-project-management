import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberItem } from './project-member-item.component';

describe('ProjectMemberItem', () => {
  let component: ProjectMemberItem;
  let fixture: ComponentFixture<ProjectMemberItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMemberItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

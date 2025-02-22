import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContentMember } from './workspace-content-member.component';

describe('WorkspaceContentMember', () => {
  let component: WorkspaceContentMember;
  let fixture: ComponentFixture<WorkspaceContentMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContentMember]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceContentMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

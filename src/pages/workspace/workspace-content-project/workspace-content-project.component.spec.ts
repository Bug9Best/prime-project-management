import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContentProject } from './workspace-content-project.component';

describe('WorkspaceContentProject', () => {
  let component: WorkspaceContentProject;
  let fixture: ComponentFixture<WorkspaceContentProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContentProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceContentProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

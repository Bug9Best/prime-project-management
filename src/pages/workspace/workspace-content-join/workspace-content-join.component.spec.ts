import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContentJoin } from './workspace-content-join.component';

describe('WorkspaceContentJoin', () => {
  let component: WorkspaceContentJoin;
  let fixture: ComponentFixture<WorkspaceContentJoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContentJoin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceContentJoin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

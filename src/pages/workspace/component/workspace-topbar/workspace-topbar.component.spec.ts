import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTopbar } from './workspace-topbar.component';

describe('WorkspaceTopbar', () => {
  let component: WorkspaceTopbar;
  let fixture: ComponentFixture<WorkspaceTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTopbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

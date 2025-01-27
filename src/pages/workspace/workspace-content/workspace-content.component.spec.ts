import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContentPage } from './workspace-content.component';

describe('WorkspaceContentPage', () => {
  let component: WorkspaceContentPage;
  let fixture: ComponentFixture<WorkspaceContentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

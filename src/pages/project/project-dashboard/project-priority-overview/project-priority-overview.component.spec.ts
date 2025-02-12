import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPriorityOverviewComponent } from './project-priority-overview.component';

describe('ProjectPriorityOverviewComponent', () => {
  let component: ProjectPriorityOverviewComponent;
  let fixture: ComponentFixture<ProjectPriorityOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPriorityOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPriorityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

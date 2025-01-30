import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRecentActivityComponent } from './project-recent-activity.component';

describe('ProjectRecentActivityComponent', () => {
  let component: ProjectRecentActivityComponent;
  let fixture: ComponentFixture<ProjectRecentActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRecentActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRecentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

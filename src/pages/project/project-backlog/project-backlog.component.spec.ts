import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBacklog } from './project-backlog.component';

describe('ProjectBacklog', () => {
  let component: ProjectBacklog;
  let fixture: ComponentFixture<ProjectBacklog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBacklog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectBacklog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

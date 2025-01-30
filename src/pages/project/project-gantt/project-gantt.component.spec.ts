import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGantt } from './project-gantt.component';

describe('ProjectGantt', () => {
  let component: ProjectGantt;
  let fixture: ComponentFixture<ProjectGantt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGantt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectGantt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

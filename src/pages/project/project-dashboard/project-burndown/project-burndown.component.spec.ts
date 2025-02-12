import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBurndown } from './project-burndown.component';

describe('ProjectBurndown', () => {
  let component: ProjectBurndown;
  let fixture: ComponentFixture<ProjectBurndown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBurndown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectBurndown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

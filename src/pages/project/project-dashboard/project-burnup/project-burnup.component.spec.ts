import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBurnup } from './project-burnup.component';

describe('ProjectBurnup', () => {
  let component: ProjectBurnup;
  let fixture: ComponentFixture<ProjectBurnup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBurnup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectBurnup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

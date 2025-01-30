import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResource } from './project-resource.component';

describe('ProjectResource', () => {
  let component: ProjectResource;
  let fixture: ComponentFixture<ProjectResource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectResource]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectResource);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

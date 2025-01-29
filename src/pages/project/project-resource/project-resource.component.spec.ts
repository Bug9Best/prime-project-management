import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResourceComponent } from './project-resource.component';

describe('ProjectResourceComponent', () => {
  let component: ProjectResourceComponent;
  let fixture: ComponentFixture<ProjectResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

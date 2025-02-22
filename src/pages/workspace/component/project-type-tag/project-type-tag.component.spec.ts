import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeTag } from './project-type-tag.component';

describe('ProjectTypeTag', () => {
  let component: ProjectTypeTag;
  let fixture: ComponentFixture<ProjectTypeTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTypeTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

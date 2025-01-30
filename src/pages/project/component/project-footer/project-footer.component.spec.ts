import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFooter } from './project-footer.component';

describe('ProjectFooter', () => {
  let component: ProjectFooter;
  let fixture: ComponentFixture<ProjectFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

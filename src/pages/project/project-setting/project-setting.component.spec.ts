import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetting } from './project-setting.component';

describe('ProjectSetting', () => {
  let component: ProjectSetting;
  let fixture: ComponentFixture<ProjectSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

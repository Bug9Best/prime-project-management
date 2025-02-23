import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBreadcrumbComponent } from './sprint-breadcrumb.component';

describe('SprintBreadcrumbComponent', () => {
  let component: SprintBreadcrumbComponent;
  let fixture: ComponentFixture<SprintBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

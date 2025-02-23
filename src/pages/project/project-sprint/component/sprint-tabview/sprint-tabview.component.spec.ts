import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTabviewComponent } from './sprint-tabview.component';

describe('SprintTabviewComponent', () => {
  let component: SprintTabviewComponent;
  let fixture: ComponentFixture<SprintTabviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintTabviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

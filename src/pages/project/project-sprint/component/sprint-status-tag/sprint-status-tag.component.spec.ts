import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStatusTagComponent } from './sprint-status-tag.component';

describe('SprintStatusTagComponent', () => {
  let component: SprintStatusTagComponent;
  let fixture: ComponentFixture<SprintStatusTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintStatusTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintStatusTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

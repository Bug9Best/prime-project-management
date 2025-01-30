import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjectCreateComponent } from './form-project-create.component';

describe('FormProjectCreateComponent', () => {
  let component: FormProjectCreateComponent;
  let fixture: ComponentFixture<FormProjectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProjectCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

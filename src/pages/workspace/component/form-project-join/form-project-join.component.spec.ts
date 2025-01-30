import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjectJoin } from './form-project-join.component';

describe('FormProjectJoin', () => {
  let component: FormProjectJoin;
  let fixture: ComponentFixture<FormProjectJoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProjectJoin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProjectJoin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

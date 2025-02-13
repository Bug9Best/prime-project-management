import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAuthenPage } from './verify-authen.component';

describe('VerifyAuthenPage', () => {
  let component: VerifyAuthenPage;
  let fixture: ComponentFixture<VerifyAuthenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyAuthenPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAuthenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

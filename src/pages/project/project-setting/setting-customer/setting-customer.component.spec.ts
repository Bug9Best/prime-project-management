import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCustomer } from './setting-customer.component';

describe('SettingCustomer', () => {
  let component: SettingCustomer;
  let fixture: ComponentFixture<SettingCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

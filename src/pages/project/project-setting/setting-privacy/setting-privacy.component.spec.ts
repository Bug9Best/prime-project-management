import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPrivacy } from './setting-privacy.component';

describe('SettingPrivacy', () => {
  let component: SettingPrivacy;
  let fixture: ComponentFixture<SettingPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPrivacy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPrivacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

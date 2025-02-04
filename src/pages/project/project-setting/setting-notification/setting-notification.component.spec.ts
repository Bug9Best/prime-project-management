import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNotification } from './setting-notification.component';

describe('SettingNotification', () => {
  let component: SettingNotification;
  let fixture: ComponentFixture<SettingNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

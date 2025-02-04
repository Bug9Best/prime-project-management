import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGeneral } from './setting-general.component';

describe('SettingGeneral', () => {
  let component: SettingGeneral;
  let fixture: ComponentFixture<SettingGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGeneral]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingGeneral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

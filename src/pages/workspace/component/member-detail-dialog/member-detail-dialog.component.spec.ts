import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailDialog } from './member-detail-dialog.component';

describe('MemberDetailDialog', () => {
  let component: MemberDetailDialog;
  let fixture: ComponentFixture<MemberDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRoleTag } from './member-role-tag.component';

describe('MemberRoleTag', () => {
  let component: MemberRoleTag;
  let fixture: ComponentFixture<MemberRoleTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberRoleTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberRoleTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTag } from './resource-tag.component';

describe('ResourceTag', () => {
  let component: ResourceTag;
  let fixture: ComponentFixture<ResourceTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

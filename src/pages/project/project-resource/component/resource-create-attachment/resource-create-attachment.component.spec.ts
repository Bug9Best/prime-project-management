import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCreateAttachment } from './resource-create-attachment.component';

describe('ResourceCreateAttachment', () => {
  let component: ResourceCreateAttachment;
  let fixture: ComponentFixture<ResourceCreateAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCreateAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceCreateAttachment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

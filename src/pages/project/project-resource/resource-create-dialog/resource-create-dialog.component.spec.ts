import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCreateDialog } from './resource-create-dialog.component';

describe('ResourceCreateDialog', () => {
  let component: ResourceCreateDialog;
  let fixture: ComponentFixture<ResourceCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCreateDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResourceCreateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

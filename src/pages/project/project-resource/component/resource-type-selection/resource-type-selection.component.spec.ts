import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTypeSelection } from './resource-type-selection.component';

describe('ResourceTypeSelection', () => {
  let component: ResourceTypeSelection;
  let fixture: ComponentFixture<ResourceTypeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceTypeSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTypeSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

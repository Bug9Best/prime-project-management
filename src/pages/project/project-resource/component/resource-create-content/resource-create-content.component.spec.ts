import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCreateContent } from './resource-create-content.component';

describe('ResourceCreateContent', () => {
  let component: ResourceCreateContent;
  let fixture: ComponentFixture<ResourceCreateContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCreateContent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResourceCreateContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

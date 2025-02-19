import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAddComponent } from './board-add.component';

describe('BoardAddComponent', () => {
  let component: BoardAddComponent;
  let fixture: ComponentFixture<BoardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

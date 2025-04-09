import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentListItemComponent } from './segment-list-item.component';

describe('SegmentListItemComponent', () => {
  let component: SegmentListItemComponent;
  let fixture: ComponentFixture<SegmentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

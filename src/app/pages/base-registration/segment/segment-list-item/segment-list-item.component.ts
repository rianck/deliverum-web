import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'c10-segment-list-item',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './segment-list-item.component.html',
  styleUrl: './segment-list-item.component.css'
})
export class SegmentListItemComponent {
  @Input({ required: true }) id!: number;
  @Input({ required: true }) name!: string;

  @Output() edited = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();

  edit(id: number): void {
    this.edited.emit(id);
  }

  remove(id: number): void {
    this.removed.emit(id);
  }
}

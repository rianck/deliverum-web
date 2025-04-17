import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { SegmentComponent } from "./segment/segment.component";
import { SegmentFormComponent } from "./segment/segment-form/segment-form.component";

@Component({
  selector: 'c10-base-registration',
  standalone: true,
  imports: [NgClass, NgIf, SegmentComponent, SegmentFormComponent],
  templateUrl: './base-registration.component.html',
  styleUrl: './base-registration.component.css'
})
export class BaseRegistrationComponent {
  activeTab: string = 'segment';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

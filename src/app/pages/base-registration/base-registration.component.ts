import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { SegmentComponent } from "./segment/segment.component";

@Component({
  selector: 'c10-base-registration',
  standalone: true,
  imports: [NgClass, NgIf, SegmentComponent],
  templateUrl: './base-registration.component.html',
  styleUrl: './base-registration.component.css'
})
export class BaseRegistrationComponent {
  activeTab: string = 'segment';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

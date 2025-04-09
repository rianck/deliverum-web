import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  isActive: boolean = false;
  togglePopover() {
    this.isActive = !this.isActive;
  }
}

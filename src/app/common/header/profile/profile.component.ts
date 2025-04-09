import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  isActive: boolean = false;
  togglePopover() {
    this.isActive = !this.isActive;
  }
}

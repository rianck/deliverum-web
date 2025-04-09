import { Component, Input } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

type TMenuItem = {
  title: string;
  href: string;
};

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [ NgClass, NgFor ],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input() items: TMenuItem[] = [];
  isActive: boolean = false;
  toggleMenu() {
    this.isActive = !this.isActive;
  }
}

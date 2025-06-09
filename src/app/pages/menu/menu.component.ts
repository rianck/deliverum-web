import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MenuItemComponent } from "./menu-item/menu-item.component";


@Component({
  selector: 'drum-menu',
  standalone: true,
  imports: [NgClass, NgIf, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
  export class MenuComponent {
  activeTab: string = 'menuItem';
    setActiveTab(tab: string) {
      this.activeTab = tab;
  }
 }

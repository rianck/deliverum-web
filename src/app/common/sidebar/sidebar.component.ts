import { Component } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { LayoutService } from '../../layout.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private layoutService: LayoutService) {}
  toggleLayout() {
    this.layoutService.toggleActiveState();
  }
}

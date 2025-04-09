import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../common/header/header.component';
import { SidebarComponent } from '../../common/sidebar/sidebar.component';
import { LayoutService } from '../../layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, NgClass],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  isActive: boolean = true;
  constructor(private layoutService: LayoutService) { }
  ngOnInit() {
    // Se inscreve para ouvir mudanças no estado da classe 'active'
    this.layoutService.layoutState$.subscribe((state) => {
      this.isActive = state;
    });
  }
}

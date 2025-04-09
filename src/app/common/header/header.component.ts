import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { InputSearchComponent } from "../../shared/components/input-search/input-search.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NotificationsComponent, ProfileComponent, InputSearchComponent, TranslateModule, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private layoutService: LayoutService,
    private readonly translateService: TranslateService
  ) { }
  toggleLayout() {
    this.layoutService.toggleActiveState();
  }
}

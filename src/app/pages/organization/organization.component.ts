import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { CompanyComponent } from "./company/company.component";


@Component({
  selector: 'c10-organization',
  standalone: true,
  imports: [NgClass, NgIf, CompanyComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {
  activeTab: string = 'company';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

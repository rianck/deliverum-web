import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BaseRegistrationComponent } from './pages/base-registration/base-registration.component';
import { SegmentComponent } from './pages/base-registration/segment/segment.component';
import { SegmentFormComponent } from './pages/base-registration/segment/segment-form/segment-form.component';
import { BuildingComponent } from './pages/building/building.component';
import { CompanyComponent } from './pages/company/company.component';
import { BuildingFormComponent } from './pages/building/building-form/building-form.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomersFormComponent } from './pages/customers/customers-form/customers-form.component';

export const routes: Routes = [
  {
    path: 'access',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      },      
      {
        path: 'building',
        component: BuildingComponent
      },
      {
        path: 'building-form',
        component: BuildingFormComponent
      },
      {
        path: 'baseRegistration',
        component: BaseRegistrationComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customers-form',
        component: CustomersFormComponent
      },
      {
        path: 'segment',
        component: SegmentComponent
      },
      {
        path: 'segment-form',
        component: SegmentFormComponent
      }
    ]
  }
];

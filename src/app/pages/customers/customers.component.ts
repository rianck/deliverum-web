import { Customer } from '../../models';
import { CustomersService } from '../../services/customers/customers.service';
import { BaseListSimplerComponent } from '../../shared/components/base-list/base-list-simpler-component';
import { Component, OnDestroy } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '../../shared/constants';
import { DialogService } from '../../shared/services/dialog.service';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { ModalRemoveComponent } from '../../shared/components/modal-remove/modal-remove.component';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'c10-customers',
  standalone: true,
  imports: [
    InputSearchComponent,
    ModalRemoveComponent,
    PaginationComponent,
    RouterLink,
    TranslateModule
],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent extends BaseListSimplerComponent<Customer> implements OnDestroy {
  
  override _criteria = {
    orderBy: 'FirstName',
    page: 1,
    size: DEFAULT_PAGE_SIZE,
  };

  override formPath = '/customers-form';

  override readonly orderByOptions = [
    { value: 'name_asc', label: 'labels.firstName', bag: 'FirstName', desc: false },
    { value: 'name_desc', label: 'labels.firstName', bag: 'FirstName', desc: true }
  ].map(item => ({
    ...item,
    label: `${this.translateService.instant(item.label)} ${item.desc ? '▼' : '▲'}`
  }));

  constructor(
    protected override readonly dataService: CustomersService,
    protected override readonly dialogService: DialogService<Customer>,
    private readonly translateService: TranslateService
  ) {
    super(dataService, dialogService);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
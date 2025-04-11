import { Building } from '../../models';
import { BuildingService } from '../../services/building/building.service';
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
  selector: 'c10-building',
  standalone: true,
  imports: [
    InputSearchComponent,
    ModalRemoveComponent,
    PaginationComponent,
    RouterLink,
    TranslateModule
],
  templateUrl: './building.component.html',
  styleUrl: './building.component.css'
})
export class BuildingComponent extends BaseListSimplerComponent<Building> implements OnDestroy {
  
  override _criteria = {
    orderBy: 'buildingName',
    page: 1,
    size: DEFAULT_PAGE_SIZE,
  };

  override formPath = '/building-form';

  override readonly orderByOptions = [
    { value: 'buildingName_asc', label: 'labels.buildingName', bag: 'Obra', desc: false },
    { value: 'buildingName_desc', label: 'labels.buildingName', bag: 'Obra', desc: true }
  ].map(item => ({
    ...item,
    label: `${this.translateService.instant(item.label)} ${item.desc ? '▼' : '▲'}`
  }));

  constructor(
    protected override readonly dataService: BuildingService,
    protected override readonly dialogService: DialogService<Building>,
    private readonly translateService: TranslateService
  ) {
    super(dataService, dialogService);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

import { Segment } from '../../../models';
import { SegmentService } from '../../../services/segment/segment.service';
import { BaseListSimplerComponent } from '../../../shared/components/base-list/base-list-simpler-component';
import { Component, OnDestroy } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from '../../../shared/constants';
import { DialogService } from '../../../shared/services/dialog.service';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';
import { ModalRemoveComponent } from '../../../shared/components/modal-remove/modal-remove.component';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'c10-segment',
  standalone: true,
  imports: [
    InputSearchComponent,
    ModalRemoveComponent,
    PaginationComponent,
    RouterLink,
    DialogModule,
    TranslateModule
],
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.css'
})
export class SegmentComponent extends BaseListSimplerComponent<Segment> implements OnDestroy {
  
 
  override _criteria = {
    orderBy: 'Name',
    page: 1,
    size: DEFAULT_PAGE_SIZE,
  };

  override formPath = '/segment-form';

  override readonly orderByOptions = [
    { value: 'name_asc', label: 'labels.firstName', bag: 'Name', desc: false },
    { value: 'name_desc', label: 'labels.firstName', bag: 'Name', desc: true }
  ].map(item => ({
    ...item,
    label: `${this.translateService.instant(item.label)} ${item.desc ? '▼' : '▲'}`
  }));

  constructor(
    protected override readonly dataService: SegmentService,
    protected override readonly dialogService: DialogService<Segment>,
    private readonly translateService: TranslateService
  ) {
    super(dataService, dialogService);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
import { Component, OnDestroy } from '@angular/core';
import { HeaderPageComponent } from '../../../shared/components/header-page/header-page.component';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';
import { ModalRemoveComponent } from '../../../shared/components/modal-remove/modal-remove.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from '../../../shared/components/base-list/base-list-component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Segment } from '../../../models/segment';
import { SegmentService } from '../../../services/segment/segment.service';
import { SegmentFormService } from '../../../services/segment/segment-form.service';
import { FormsService } from '../../../shared/services/forms.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { DEFAULT_PAGE_SIZE } from '../../../shared/constants';
import { SegmentListItemComponent } from "./segment-list-item/segment-list-item.component";
import { RouterLink } from '@angular/router';



@Component({
  selector: 'c10-segment',
  standalone: true,
  imports: [

    CommonModule,
    HeaderPageComponent,
    InputSearchComponent,
    ModalRemoveComponent,
    PaginationComponent,
    SelectComponent,
    TranslateModule,
    RouterLink,
    SegmentListItemComponent
],
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.css'
})
export class SegmentComponent extends BaseListComponent<Segment> implements OnDestroy {
  override _criteria = {
    orderBy: 'Name',
    page: 1,
    size: DEFAULT_PAGE_SIZE,
  };

   formPath = '/segment-form';
  
  override readonly orderByOptions = [
    { value: 'name_asc', label: 'labels.name', bag: 'Name', desc: false },
    { value: 'name_desc', label: 'labels.name', bag: 'Name', desc: true }
  ].map(item => ({
    ...item,
    label: `${this.translateService.instant(item.label)} ${item.desc ? '▼' : '▲'}`
  }));

  constructor(
    private readonly segmentService: SegmentService,
    private readonly segmentFormService: SegmentFormService,
    protected override readonly formsService: FormsService<Segment>,
    protected override readonly dialogService: DialogService<Segment>,
    private readonly translateService: TranslateService
  ) {
    super(segmentService, segmentFormService, formsService, dialogService);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

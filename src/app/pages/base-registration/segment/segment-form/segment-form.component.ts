import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { SelectOption } from '../../../../shared/view-models';
import { Segment } from '../../../../models';
import { SegmentFormService } from '../../../../services/segment/segment-form.service';
import { SegmentService } from '../../../../services/segment/segment.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'c10-segment-form',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    InputTextComponent,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './segment-form.component.html',
  styleUrl: './segment-form.component.css'
})
export class SegmentFormComponent extends BaseFormComponent<Segment> implements OnInit, OnDestroy {
  protected override readonly formId: string = 'segment-form';

  businessTypes: Array<SelectOption> = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly segmentFormService: SegmentFormService,
    private readonly segmentService: SegmentService,
    protected override readonly dialogService: DialogService<Segment>,
    private readonly translateService: TranslateService,
  ) {
    super(
      fb.group({
        name: [, [Validators.required]]
      }),
      segmentFormService,
      segmentService,
      dialogService);

 }

  ngOnInit(): void {
    super.init();    
  }

  ngOnDestroy(): void {
    super.destroy();
  }
}

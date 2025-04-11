import { Building } from '../../../models';
import { BuildingService } from '../../../services/building/building.service';
import { BaseFormSimplerComponent } from '../../../shared/components/base-form/base-form-simpler-component';
import { CalendarModule } from 'primeng/calendar';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { normalizeValues } from '../../../shared/utils/fns-utils';

@Component({
  selector: 'c10-building-form',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './building-form.component.html',
  styleUrl: './building-form.component.css'
})
export class BuildingFormComponent extends BaseFormSimplerComponent<Building> implements OnInit, OnDestroy {


  constructor(
    private readonly fb: FormBuilder,
    private readonly buildingService: BuildingService,
    private readonly domSanitizer: DomSanitizer
  ) {
    super(fb.group({
        buildingName: [, [Validators.required]],
        responsible: [, [Validators.required]],
      }),
      buildingService);
  }

  ngOnInit(): void {
    this.init();
   
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  override save(): void {
    if (!this.form.valid) return;
    const value = normalizeValues({
      ...this.original,
      ...this.current,
      ...this.form.value      
    });
    delete value.id;    
  }

}



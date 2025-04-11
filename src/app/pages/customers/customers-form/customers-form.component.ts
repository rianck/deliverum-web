import { Customer } from '../../../models';
import { CustomersService } from '../../../services/customers/customers.service';
import { BaseFormSimplerComponent } from '../../../shared/components/base-form/base-form-simpler-component';
import { CalendarModule } from 'primeng/calendar';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { format } from 'date-fns';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { NgIf } from '@angular/common';
import { normalizeValues } from '../../../shared/utils/fns-utils';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'c10-customers-form',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.css'
})
export class CustomersFormComponent extends BaseFormSimplerComponent<Customer> implements OnInit, OnDestroy {

  readonly contentTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  private formData?: FormData;
  imgSrc?: SafeResourceUrl;

  get dateOfBirth(): AbstractControl {
    return this.form.get('dateOfBirth')!;
  }

  get startDate(): AbstractControl {
    return this.form.get('startDate')!;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly customersService: CustomersService,
    private readonly domSanitizer: DomSanitizer
  ) {
    super(fb.group({
        firstName: [, [Validators.required]],
        lastName: [, [Validators.required]],
        dateOfBirth: [, [Validators.required]],
        email: [, [Validators.required, Validators.email]],
        phoneNumber: [, [Validators.required, Validators.pattern(/^$|^\d{11}$/)]],
        jobPosition: [, [Validators.required]],
        startDate: [, []]
      }),
      customersService);
  }

  ngOnInit(): void {
    this.init();

    this.subs.sink = this.customersService
      .item$
      .subscribe(item => {
        if (!item?.photoUrl) return;
        this.imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(item.photoUrl);
      });
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  changePhoto($event: any) {
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length) {
      const [file] = $event.target.files;
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgSrc = reader.result as string;
          this.formData = new FormData();
          this.formData.append('file', file, file.name);
          if (this.form.pristine) {
            this.form.markAsDirty();
          }
        };
      }
    }
  }

  override save(): void {
    if (!this.form.valid) return;
    const value = normalizeValues({
      ...this.original,
      ...this.current,
      ...this.form.value,
      dateOfBirth: format(this.dateOfBirth.value, 'yyyy-MM-dd'),
      startDate: format(this.startDate.value, 'yyyy-MM-dd')
    });
    delete value.id;
    if (!this.id) {
      this.customersService.post(value, this.formData)
    } else {
      this.customersService.put(this.id, value, this.formData);
    }
  }
}
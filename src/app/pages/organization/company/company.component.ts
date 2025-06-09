import { Company } from '../../../models';
import { CompanyService } from '../../../services/company/company.service';
import { ViaCepService } from '../../../shared/services/viacep.service';
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
  selector: 'c10-company',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent extends BaseFormSimplerComponent<Company> implements OnInit, OnDestroy {

  private formData?: FormData;
  logoPreview: string | ArrayBuffer | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly viaCepService: ViaCepService,
    private readonly companyService: CompanyService,
    private readonly domSanitizer: DomSanitizer
  ) {
    super(fb.group({
        cnpj: ['', [Validators.required]],
        fantasyName: ['', [Validators.required]],
        reasonName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        district: ['', [Validators.required]],
        numberAddress: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        city: ['', [Validators.required]],
        complement: [''],
        responsible: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        logo: [null]
      }),
      companyService);
  }

 observeCep() {
    this.form.get('cep')?.valueChanges.subscribe(value => {
      if (value?.length == 8) {
        this.sourceAddress();
      }
    });
  }

  sourceAddress() {
    const cep = this.form.get('cep')?.value;
    this.viaCepService.getAddressByCep(cep).subscribe({
      next: (response) => {
        this.form.patchValue({
          address: response.logradouro,
          neighborhood: response.bairro,
          city: response.localidade,
        });
      },
      error: () => {
        console.log('Erro ao buscar o endereço');
      }
    });
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.logoPreview = reader.result;
      reader.readAsDataURL(file);
      this.form.patchValue({ logo: file });
    }
  }

  ngOnInit(): void {
    this.init();
    this.observeCep();
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
    if (!this.id) {
      this.companyService.post(value, this.formData);
    } else {
      this.companyService.put(this.id, value, this.formData);
    }
  }
}
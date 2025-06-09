import { Customer } from '../../../models';
import { CustomersService } from '../../../services/customers/customers.service';
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
  selector: 'c10-customers-form',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.css'
})
export class CustomersFormComponent extends BaseFormSimplerComponent<Customer> implements OnInit, OnDestroy {

  private formData?: FormData;
  customerType: string = 'physicalPerson';

  get dateOfBirth(): AbstractControl {
    return this.form.get('dateOfBirth')!;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly viaCepService: ViaCepService,
    private readonly customersService: CustomersService,
    private readonly domSanitizer: DomSanitizer
  ) {
    super(fb.group({
        customerType: ['physicalPerson', Validators.required], // Campo para o tipo de cliente
        cpf: [''], // Campo para Pessoa Física
        cnpj: [''], // Campo para Pessoa Jurídica
        reasonName: [''], // 
        fantasyName: [''], // 
        fullName: [, [Validators.required]],        
        dateOfBirth: [, [Validators.required]],
        email: [, [Validators.required, Validators.email]],
        phoneNumber: [, [Validators.required, Validators.pattern(/^$|^\d{11}$/)]],
        cep: [''], // 
        address: [''], // 
        numberAddress: [''], // 
        district: [''], // 
        city: [''], // 
        complement: [''] // 
      }),
      customersService);
  }

  observeCep(){
    this.form.get('cep')?.valueChanges.subscribe(value =>{
      if (value?.length == 8){
          // source address
          this.sourceAddress();
      }
    })
  }

  sourceAddress(){
    var cep = this.form.get('cep')?.value;
    this.viaCepService.getAddressByCep(cep).subscribe(
    {
      next: (response) => {
        this.form.patchValue({
          address: response.logradouro,
          district: response.bairro,
          city: response.localidade,
        });        
      },
      error: () =>{
          console.log('Erro ao buscar o endereço');
      }
    }
    )
  }

  onCustomerTypeChange() {
    const type = this.form.get('customerType')?.value;
    this.customerType = type;    
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
      ...this.form.value,
      dateOfBirth: format(this.dateOfBirth.value, 'yyyy-MM-dd')      
    });
    delete value.id;
    if (!this.id) {
      this.customersService.post(value, this.formData)
    } else {
      this.customersService.put(this.id, value, this.formData);
    }
  }
}
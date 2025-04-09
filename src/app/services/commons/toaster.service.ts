import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private readonly translateService: TranslateService) {
  }

  getSaveMessage(status: boolean): Message {
    const message = {
      severity: status
        ? 'success'
        : 'error',
      summary : status
        ? this.translateService.instant('labels.success')
        : this.translateService.instant('labels.error'),
      detail: status
        ? this.translateService.instant('labels.dataSavedSuccessfully')
        : this.translateService.instant('labels.dataNotSaved'),
      styleClass: status
        ? 'bg-primary-3 text-white text-sm lg:mt-12'
        : 'bg-primary-6 text-black text-sm lg:mt-12'
    };
    return message;
  }
}
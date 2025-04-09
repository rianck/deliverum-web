import { Component, OnDestroy } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SubSink } from 'subsink';
import { ToastModule } from 'primeng/toast';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SpinnerComponent,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  
  private readonly subs = new SubSink();

  readonly title = 'cowz';

  constructor(
    private readonly translate: TranslateService,
    private readonly primengConfig: PrimeNGConfig
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    this.subs.sink = this.translate
      .get('primeng')
      .subscribe((res: any) => this.primengConfig.setTranslation(res));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

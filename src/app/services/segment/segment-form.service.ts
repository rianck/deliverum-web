import { BaseFormService } from '../../shared/services/base-form.service';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { SegmentService } from './segment.service';

@Injectable({
  providedIn: 'root'
})
export class SegmentFormService extends BaseFormService {
  readonly #segment$: WritableSignal<Map<number, string>> = signal(new Map());

  readonly suppliers$ = computed(() => this.#segment$());

  constructor(private readonly segmentService: SegmentService) {
    super();

    this.segmentService
      .items$
      .subscribe(result => {
        if (!result?.items) return;
        const segments = new Map(result.items.map(s =>[s.id, s.name]));
        this.#segment$.set(segments);
      });
  }

  loadSuppliers(): void {
    this.segmentService.get({ orderBy: 'Name' });
  }
}

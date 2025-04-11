import { Customer } from '../../models';
import { BaseService } from '../../shared/services/base.service';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService<Customer> {

  private readonly getPhotoUrlSubject = new Subject<string>();
  private readonly postPhotoSubject = new Subject<number>();

  readonly photoUrl$ = this.getPhotoUrlSubject.asObservable();
  readonly photoUploaded$ = this.postPhotoSubject.asObservable();

  constructor(protected override readonly http: HttpClient) {
    super('customers', http);
  }

  override getById(id: number): void {
    if (isNaN(id)) return;
    const subscription = this.http
      .get<Customer>(`${this.url}/${id}`)
      .pipe(
        switchMap(result => this.http
          .get<string>(`${this.url}/${id}/photo`)
          .pipe(
            map(photoUrl => ({ ...result, photoUrl }))
          )
        ))
      .subscribe(result => {
        const data = {
          ...result,
          dateOfBirth: new Date(result.dateOfBirth),
          startDate: !!result.startDate
            ? new Date(result.startDate)
            : undefined
        };
        this.getByIdSubject.next(data);
        subscription.unsubscribe();
      });
  }

  post(agent: Customer, formData?: FormData): void {
    const subscription = this.http
      .post<number>(this.url, agent)
      .pipe(
        catchError(e => {
          this.handleError(e);
          return of(0);
        }),
        switchMap(id => {
          if (!id || !formData) return of(id);
          return this.http
            .post(`${this.url}/${id}/photo`, formData)
            .pipe(map(() => id));
        }))
      .subscribe(result => {
        this.resetCache();
        this.postSubject.next(result);
        subscription.unsubscribe();
      });
  }

  put(id: number, data: Customer, formData?: FormData, params?: { [key: string]: any }): void {
    const url = this.setUrlParams(`${this.url}/${id}`, params);
    const subscription = this.http
      .put<boolean>(url, data)
      .pipe(
        catchError(e => {
          this.handleError(e);
          return of(false);
        }),
        switchMap(status => {
          if (!status || !formData) return of(status);
          return this.http
            .post(`${url}/photo`, formData)
            .pipe(map(() => status));
        })
      )
      .subscribe(result => {
        this.resetCache();
        this.putSubject.next(result);
        subscription.unsubscribe();
      });
  }

}
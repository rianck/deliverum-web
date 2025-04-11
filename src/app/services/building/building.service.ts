import { Building } from '../../models';
import { BaseService } from '../../shared/services/base.service';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildingService extends BaseService<Building> {

  private readonly getPhotoUrlSubject = new Subject<string>();
  private readonly postPhotoSubject = new Subject<number>();

  readonly photoUrl$ = this.getPhotoUrlSubject.asObservable();
  readonly photoUploaded$ = this.postPhotoSubject.asObservable();

  constructor(protected override readonly http: HttpClient) {
    super('agents', http);
  }

  override getById(id: number): void {
    if (isNaN(id)) return;
    const subscription = this.http
      .get<Building>(`${this.url}/${id}`)
      .pipe(
        switchMap(result => this.http
          .get<string>(`${this.url}/${id}/photo`)
          .pipe(
            map(photoUrl => ({ ...result, photoUrl }))
          )
        ))      
  }

  post(agent: Building, formData?: FormData): void {
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

  put(id: number, data: Building, formData?: FormData, params?: { [key: string]: any }): void {
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

import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gamification } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GamificationService extends BaseService<Gamification> {

  constructor(protected override readonly http: HttpClient) {
    super('gamification', http);
  }
}

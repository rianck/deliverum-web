import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService<Player> {

  constructor(protected override readonly http: HttpClient) {
    super('player', http);
  }
}

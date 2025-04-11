import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segment } from '../../models/segment';

@Injectable({
  providedIn: 'root'
})
export class SegmentService extends BaseService<Segment> {

  constructor(protected override readonly http: HttpClient) {
    super('segment', http);
  }
}

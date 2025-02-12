import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizeService {

  client = inject(HttpClient);
  autorization(code: string) {
    return this.client.get<any>('http://localhost:8000/api/vertify/autorization', {
      params: {
        code: code
      }
    });
  }
}

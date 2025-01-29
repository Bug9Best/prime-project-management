import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, TapObserver } from 'rxjs';
import { environment } from '../../environments/environment';

export class BaseModel {
  id?: string | number;
  created_at?: string;
  created_by?: string;
  created_name?: string;
  updated_at?: string;
  updated_by?: string;
  updated_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  private baseUrl = environment.apiUrl;
  path: string = '_blank';

  constructor(
    public client: HttpClient
  ) { }

  item: T | null = null;
  items: T[] | null = null;
  item$: Subject<T | null> = new Subject<T | null>();
  items$: Subject<T[] | null> = new Subject<T[] | null>();

  itemChange: Partial<TapObserver<T>> = {
    next: res => {
      this.item = res;
      this.item$.next(this.item);
    }
  }

  itemsChange: Partial<TapObserver<T[]>> = {
    next: res => {
      this.items = res;
      this.items$.next(this.items);
    }
  }

  get getBaseUrl(): string {
    return this.baseUrl + this.path;
  }

  getAll(): Observable<T[]> {
    return this.client.get<T[]>(this.getBaseUrl);
  }

  getOne(id: string): Observable<T> {
    return this.client.get<T>(`${this.getBaseUrl}/${id}`);
  }

  create(data: any): Observable<T> {
    return this.client.post<T>(this.getBaseUrl, data);
    // return this.http.post<T>(this.getBaseUrl, data).pipe(tap(this.itemChange));
  }

  update(id: string, data: any): Observable<T> {
    return this.client.put<T>(`${this.getBaseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.client.delete<void>(`${this.getBaseUrl}/${id}`);
  }

  deleteAll(): Observable<void[]> {
    return this.client.delete<void[]>(this.getBaseUrl);
  }
}

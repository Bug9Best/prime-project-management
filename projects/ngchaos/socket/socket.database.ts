/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CSocket } from "./socket.model";
import Echo from 'laravel-echo';

export class ChaosSocketDatabase<T> {
  
  constructor(
    private name: string,
    private baseUrl: string,
    private echo: Echo,
    private client: HttpClient
  ) {
    
  }
  
  listen(): Observable<CSocket<T[]>> {
    return new Observable((observer) => {
      console.log("[Socket]", "Listening to", this.name);
      this.get().subscribe(res => {
        observer.next(res);
      });
      this.echo
        .channel("socket.collection." + this.name)
        .listen(".collection", (e: any) => {
          this.get().subscribe(res => {
            observer.next(res);
          });
        });
    });
  }
  
  get(): Observable<CSocket<T[]>> {
    return this.client.get<CSocket<T[]>>(`${this.baseUrl}`, {
      params: { name: this.name }
    });
  }
  
  show(id: string): Observable<CSocket<T>> {
    return this.client.get<CSocket<T>>(`${this.baseUrl}`, {
      params: {
        id: id,
        name: this.name
      }
    });
  }
  
  create(data: any): Observable<CSocket<T>> {
    return this.client.post<CSocket<T>>(`${this.baseUrl}`, {
      name: this.name,
      data: data
    });
  }
  
  update(id: string, data: any): Observable<CSocket<T>> {
    return this.client.put<CSocket<T>>(`${this.baseUrl}/${id}`, {
      name: this.name,
      data: data
    });
  }
  
  delete(id: string): Observable<CSocket<any>> {
    return this.client.delete<CSocket<any>>(`${this.baseUrl}`, {
      params: {
        id: id,
        name: this.name
      }
    });
  }
  
  find(id: string): Observable<CSocket<T>> {
    return this.show(id);
  }
  
  add(data: any): Observable<CSocket<T>> {
    return this.create(data);
  }
  
  patch(id: string, data: any): Observable<CSocket<T>> {
    return this.update(id, data);
  }
  
  remove(id: string): Observable<CSocket<any>> {
    return this.delete(id);
  }
  
}
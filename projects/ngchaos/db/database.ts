/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { toObservable } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChaosConfig, ChaosUtils } from 'ngchaos/core';
import { CBaseModel, CBaseResponse, CBaseOptions, CBasePaginate } from './database.model';

@Injectable()
export class ChaosDatabase<T extends CBaseModel> {

  client = inject(HttpClient);
  config = inject(ChaosConfig);
  
  /**
   * The path of the database or the table
   */
  path: string = '_blank';
  
  /**
    * The current state of the database
    */
  state = signal<T|null>(null);
  
  /**
    * The current value of the database
    */
  item = signal<T|null>(null);
  
  /**
   * The current values of the database
   */
  items = signal<T[]>([]);
  
  /**
   * The current paginate of the database
   */
  page = signal<number>(1);
  
  /**
   * The current per page of the database
   */
  perPage = signal<number>(10);
  
  /**
   * The current total of the database
   */
  total = signal<number>(0);

  /**
   * Sets the current value of the database and emits it to subscribers.
   * @param value The new value of the database.
   */
  updateValue = (value: CBaseResponse<T>) => {
    this.item.set(value.data);
    this.state.set(value.data);
  }

  /**
   * Sets the current values of the database and emits it to subscribers.
   * @param value The new values of the database.
   */
  updateValues = (value: CBasePaginate<T>) => {
    this.items.set(value.data as T[]);
    this.page.set(value.current_page);
    this.perPage.set(value.per_page);
    this.total.set(value.total);
  }

  /**
   * The base url of the database or the table
   * @returns string
   */
  get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.databaseUrl, this.path);
  }
  
  /**
    * Set current state
    */
  setState(item: T) {
    this.state.set(item);
  }
  
  /**
    * Set current state
    */
  getState() {
    return this.state();
  }
  
  /**
   * Set page of the database
   *
   * @param value 
   * @returns 
   */
  setPage(value: number): this {
    this.page.set(value);
    return this;
  }
  
  /**
   * Set per page of the database
   *
   * @param value 
   * @returns 
   */
  setPerPage(value: number): this {
    this.perPage.set(value);
    return this;
  }

  /**
   * Get params from options
   * @returns any
   */
  params(options?: any): any {
    let params: any = <any>{};
    if(options) {
      for(let key in options) {
        if(options[key] !== null && options[key] !== undefined)
        params[key] = options[key];
      }
    }
    return params;
  }

  /**
   * Create new item to database
   * @param item
   * @returns
   */
  create(item: T): Observable<CBaseResponse<T>> {
    return this.client
      .post<CBaseResponse<T>>(this.baseUrl, item)
      .pipe(tap(this.updateValue));
  }

  /**
   * Update item to database
   * @param item
   * @returns
   */
  update(item: T): Observable<CBaseResponse<T>> {
    if(!item.id) throw new Error("Item id is required");
    return this.client
      .put<CBaseResponse<T>>(`${this.baseUrl}/${item.id}`, item)
      .pipe(tap(this.updateValue));
  }

  /**
   * Remove item from database
   * @param item
   * @returns
   */
  remove(item: T): Observable<Object> {
    if(!item.id) throw new Error("Item id is required");
    return this.delete(item.id);
  }

  /**
   * Delete item from database
   * @param id
   * @returns
   */
  delete(id: string|number): Observable<Object> {
    return this.client.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Get all items from database
   *
   * @param options
   * @returns
   */
  get(options?: CBaseOptions): Observable<CBasePaginate<T>> {
    return this.client.get<CBasePaginate<T>>(this.baseUrl, {
      params: this.params({
        page: this.page(),
        per_page: this.perPage(),
        ...options
      })
    }).pipe(
      tap(this.updateValues),
    );
  }
  
  /**
   * Get all items from database
   *
   * @param options
   * @returns
   */
  paginate(options?: CBaseOptions): Observable<CBasePaginate<T>> {
    return this.get(options);
  }

  /**
   * Get item from database
   *
   * @param id
   * @param options
   * @returns
   */
  show(id: string|number, options?: CBaseOptions): Observable<CBaseResponse<T>> {
    return this.client
      .get<CBaseResponse<T>>(`${this.baseUrl}/${id}`, {
        params: this.params(options)
      })
      .pipe(
        tap(this.updateValue)
      );
  }

  /**
   * Save item to database
   *
   * @param item
   * @returns
   */
  save(item: T): Observable<CBaseResponse<T>> {
    return item.id
      ? this.update(item)
      : this.create(item);
  }

  /**
   * Upload file to server
   *
   * @param url
   * @param options
   * @returns
   */
  uploadFile<R>(url: string, file: File, options?: CBaseOptions): Observable<R> {
    let formData = new FormData();
    formData.append('file', new Blob([file]), file.name);

    if(options) {
      for(let key in options) {
        if(options[key] !== null && options[key] !== undefined) {
          formData.append(key, options[key]!.toString());
        }
      }
    }

    return this.client.post<R>(`${this.baseUrl}/${url}`, formData);
  }

  /**
   * Download and open file in browser from server
   *
   * @param url
   * @param options
   * @returns
   */
  openFile(url: string, options?: any): Observable<Blob> {
    return this.client.get(url, {
      params: this.params({ ...options, ...{ mode: "openFile" }}),
      responseType: 'blob'
    }).pipe(
      tap((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      })
    );
  }

  /**
   * Download file from server
   *
   * @param url
   * @param options
   * @returns
   */
  downloadFile(url: string, name?: string, options?: any): Observable<HttpResponse<Blob>> {
    return this.client.get<Blob>(url, {
      params: this.params({ ...options, ...{ mode: "downloadFile" }}),
      observe: 'response',
      responseType: 'blob' as 'json'
    }).pipe(
      tap((res) => {
        this.downloadBlobFile(res, name);
      })
    );
  }
  
  /**
   * Save file from server
   *
   * @param url
   * @param options
   * @returns
   */
  downloadBlobFile(blob: HttpResponse<Blob>, name?: string) {
    const fileName = name || blob.headers.get('X-File-Name') || 'download';
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob.body!);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  /**
   * Save file from server
   *
   * @param url
   * @param options
   * @returns
   */
  async saveFile(blob: HttpResponse<Blob>, name?: string) {
    const fileName = name || blob.headers.get('X-File-Name') || 'download';
    const handle = await (window as any).showSaveFilePicker({
      suggestedName: fileName,
      startIn: "downloads"
    });
    // Create a FileSystemWritableFileStream to write to.
    const writable = await handle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(blob.body);
    // Close the file and write the contents to disk.
    await writable.close();
  }

}


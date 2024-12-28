/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { Injectable, Injector } from '@angular/core';
import { ChaosConfig, ChaosUtils } from 'ngchaos/core';
import { CBaseOptions, CBasePaginate, COpenFilePicker } from 'ngchaos/db';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, forkJoin, from, switchMap, tap } from 'rxjs';
import { CStorage } from './storage.model';

@Injectable({ providedIn: 'root' })
export class ChaosStorage {

  constructor(private injector: Injector) { }

  /**
   * HttpClient
   * @returns HttpClient
   */
  get client(): HttpClient {
    return this.injector.get(HttpClient);
  }

  /**
   * ChaosConfig
   * @returns ChaosConfig
   */
  get config(): ChaosConfig {
    return this.injector.get(ChaosConfig);
  }

  /**
   * The base url of the database or the table
   * @returns string
   */
  get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, 'api/@chaos/storage');
  }

  /**
   * Storage Url
   */
  get storageUrl(): string {
    return this.baseUrl;
  }
  
  get(options: CBaseOptions = {}): Observable<CBasePaginate<CStorage>> {
    return this.client.get<CBasePaginate<CStorage>>(`${this.storageUrl}`, {
      params: <any>options
    });
  }

  /**
   * Upload file to server
   */
  upload(file: File, options: CBaseOptions = {}, accessType: string = "private"): Observable<CStorage> {
    let formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    formData.append('access_type', accessType);

    if(options) {
      for(let key in options) {
        if(options[key] !== null && options[key] !== undefined) {
          formData.append(key, options[key]!.toString());
        }
      }
    }

    return this.client.post<CStorage>(`${this.storageUrl}`, formData);
  }
  
  /**
   * Alias of upload private file
   */
  uploadPrivateFile(file: File, options: CBaseOptions = {}): Observable<CStorage> {
    return this.upload(file, options, 'private');
  }
  
  /**
   * Alias of upload public file
   */
  uploadPublicFile(file: File, options: CBaseOptions = {}): Observable<CStorage> {
    return this.upload(file, options, 'public');
  }

  /**
   * Select and Upload file to server
   */
  uploadFile(selectOptions: COpenFilePicker = {}, options: CBaseOptions = {}, accessType: string = "private"): Observable<CStorage[]> {
    return this.selectFile(selectOptions)
      .pipe(
        switchMap((handles: FileSystemFileHandle[]) => {
          let results: Observable<CStorage>[] = [];
          handles.forEach((handle: FileSystemFileHandle) => {
            let result = from(handle.getFile()).pipe(
              switchMap((file: File) => {
                console.log("[Storage] Upload file to server", file);
                return this.upload(file, options, accessType);
              }
            ));
            results.push(result);
          });
          return forkJoin(results);
        })
      );
  }

  /**
   * Download and open file in browser from server
   *
   * @param url
   * @param options
   * @returns
   */
  openFile(url: string): Observable<Blob> {
    return this.client.get(url, {
      responseType: 'blob'
    }).pipe(
      tap((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
    );
  }
  
  selectFile(options: COpenFilePicker = {}): Observable<FileSystemFileHandle[]> {
    if((window as any).showOpenFilePicker === undefined) {
      alert("ขออภัย! บราวเซอร์ของคุณไม่รองรับการทำงานนี้ กรุณาใช้ Google Chrome เพื่อดำเนินการต่อไป");
    }
  
    if(options.extensions?.length) {
      let types = options.extensions.map(accept => {
        return { accept: accept }
      });
      options.types = <any>types;
    }
    
    return from((window as any).showOpenFilePicker(options) as Promise<FileSystemFileHandle[]>);
  }

  /**
   * Download file from server
   *
   * @param url
   * @param options
   * @returns
   */
  downloadFile(url: string, name?: string): Observable<HttpResponse<Blob>> {
    return this.client.get<Blob>(url, {
      observe: 'response',
      responseType: 'blob' as 'json'
    }).pipe(
      tap((res) => {
        this.saveFile(res, name);
      })
    );
  }
  
  downloadZipFile(items: CStorage[], name: string = "download.zip"): Observable<HttpResponse<Blob>> {
    return this.client
    .post<Blob>(`${this.storageUrl}/downloadZip`, 
      { guids: items.map(item => item.guid)}, 
      {
        observe: 'response',
        responseType: 'blob' as 'json'
      }
    ).pipe(
      tap((res) => {
        this.saveFile(res, name);
      })
    );
  }
  
  saveFile(blob: HttpResponse<Blob>, name?: string) {
    const fileName = name || blob.headers.get('X-File-Name') || 'download';
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob.body!);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Delete file from server
   *
   * @param url
   * @param options
   * @returns
   */
  deleteFile(path: string): Observable<any> {
    path = btoa(path);
    return this.client.delete(`${this.storageUrl}/${path}`);
  }

}

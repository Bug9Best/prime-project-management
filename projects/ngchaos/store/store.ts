/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { Injectable, inject } from "@angular/core";
import { ChaosConfig } from "ngchaos/core";
import { Observable } from "rxjs";
import { openDB } from "idb";

export interface IChaosStore {
  id?: string|number;
}

@Injectable()
export class ChaosStore<T extends IChaosStore> {
  path: string = '_blank';
  keyPath: string = 'id';
  autoIncrement: boolean = true;
  indexes: string[] = [];
  
  config = inject(ChaosConfig);
  
  async open() {
    return await openDB(this.config.appId, 4, {
      upgrade: (db) => {
        console.log("[Store] Upgrading database...");
        if(!db.objectStoreNames.contains(this.path)) {
          console.log("[Store] Creating object store", this.path);
          db.createObjectStore(this.path, { 
            keyPath: this.keyPath,
            autoIncrement: this.autoIncrement
          });
        }
        
        for(let index of this.indexes) {
          console.log("[Store] Creating index", index);
          const tsx = db.transaction(this.path, "readwrite");
          const store = tsx.objectStore(this.path) as any;
          
          if(store && !store.indexNames.contains(index)) {
            store.createIndex(index, index);
            console.log("[Store] Creating index success", index);
          }
        }
      }
    });
  }
  
  create(item: T): Observable<T> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.add(this.path, item).then(id => {
          observer.next(item);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  delete(id: any): Observable<void> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.delete(this.path, id).then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  show(id: any): Observable<T> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.get(this.path, id).then(item => {
          observer.next(item);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  update(item: T): Observable<T> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.put(this.path, item).then(() => {
          observer.next(item);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  first(name: string, value: IDBValidKey | IDBKeyRange): Observable<T> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.getFromIndex(this.path, name, value).then(items => {
          observer.next(items);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  get(name: string, value: IDBValidKey | IDBKeyRange): Observable<T[]> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.getAllFromIndex(this.path, name, value).then(items => {
          observer.next(items);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  all(): Observable<T[]> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.getAll(this.path).then(items => {
          observer.next(items);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
  save(item: T): Observable<T> {
    return (item as any)[this.keyPath]
      ? this.update(item)
      : this.create(item);
  }
  
  clear(): Observable<void> {
    return new Observable(observer => {
      this.open().then(async db => {
        db.clear(this.path).then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
      });
    });
  }
  
}
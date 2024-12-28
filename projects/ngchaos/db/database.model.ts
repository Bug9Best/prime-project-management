/**
 * @license
 * Copyright 2024 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

export type CBaseOptions = {
  [param:string]:string|number|null|undefined;
}

export interface CBaseModel {
  id?: any;
}

export interface CBaseResponse<T> {
  status: number;
  data: T;
}

export interface CBasePaginate<T> {
  status: number;
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface CBaseError<T> {
  status: number;
  message: string;
  data: T;
}
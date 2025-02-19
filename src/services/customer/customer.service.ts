import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface CustomerModel extends BaseModel {
  id: string;
  customer_name: string;
  customer_email: number;
  customer_phone: string;
  employ_start_date: string | Date;
  employ_end_date: string | Date;
  customer_address: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {
  public override path: string = "customer";

  getProjectCustomer(project_id: string | number) {
    return this.client.get<any>(`${this.getBaseUrl}/getProjectCustomer`, {
      params: {
        project_id: project_id,
      },
    });
  }

  createProjectCustomer(data: CustomerModel) {
    return this.client.post<any>(`${this.getBaseUrl}/createProjectCustomer`, data);
  }
}

import { Component, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { CustomerForm } from '../component/customer-form/customer-form.component';
import { CustomerModel, CustomerService } from '../../../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'setting-customer',
  imports: [
    CommonModule,
    AppDialog,
    ScrollPanelModule,
    CustomerForm
  ],
  templateUrl: './setting-customer.component.html',
  styleUrl: './setting-customer.component.scss'
})
export class SettingCustomer {

  customerData?: CustomerModel;
  projectID: string = '';

  labelProjectName: string = 'PROJECT_MENU_SETTING_TITLE';
  labelProjectType: string = 'PROJECT_MENU_SETTING_SUBTITLE';
  labelProjectOwner: string = 'PROJECT_MENU_SETTING_STATUS';
  labelProjectCreatedDate: string = 'PROJECT_MENU_SETTING_STATUS';

  constructor(
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit() {
    this.getProjectCustomer();
  }

  getProjectCustomer() {
    this.customerService
      .getProjectCustomer(this.projectID)
      .subscribe((res) => {
        this.customerData = res;
      });
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  resetForm() {
    this.customerForm.formGroup.reset();
  }

  @ViewChild(CustomerForm) customerForm!: CustomerForm;
  onValidateForm() {
    if (this.customerForm.formGroup.invalid) {
      this.customerForm.formGroup.markAllAsTouched();
      this.showMessage('warn', 'Error', 'Please fill in all required fields');
      return;
    }

    let values = this.customerForm.formGroup.value;
    values.project_id = this.projectID;
    this.onCreateProject(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onCreateProject(values: CustomerModel) {
    this.customerService
      .create(values)
      .subscribe(() => {
        this.showMessage('success', 'Success', 'Customer created successfully');
        this.appDialog.visible = false;
        this.resetForm();
        this.getProjectCustomer();
      });
  }
}

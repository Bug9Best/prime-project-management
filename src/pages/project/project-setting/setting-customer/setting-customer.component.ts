import { Component, Input, output, ViewChild } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { CustomerForm } from '../component/customer-form/customer-form.component';
import { CustomerModel, CustomerService } from '../../../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'setting-customer',
  imports: [
    TranslateModule,
    CommonModule,
    AppDialog,
    ScrollPanelModule,
    CustomerForm,
    ButtonModule
  ],
  templateUrl: './setting-customer.component.html',
  styleUrl: './setting-customer.component.scss'
})
export class SettingCustomer {

  @Input()
  customerData?: CustomerModel = <any>{};
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

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  onEditCustomer() {
    this.appDialog.visible = true;

    if (!this.customerData) return;
    this.customerForm.formGroup.patchValue(this.customerData);
    this.customerForm.formGroup.patchValue({
      employ_start_date: new Date(this.customerData.employ_start_date),
      employ_end_date: new Date(this.customerData.employ_end_date),
    });
  }

  resetForm() {
    this.customerForm.formGroup.reset();
  }

  onCancelForm() {
    this.appDialog.visible = false;
    this.resetForm();
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
    values.employ_start_date = new Date(values.employ_start_date).toDateString();
    values.employ_end_date = new Date(values.employ_end_date).toDateString();
    this.onCreateProject(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onEditProjectEvent = output()
  onCreateProject(values: CustomerModel) {
    this.customerService
      .create(values)
      .subscribe(() => {
        this.showMessage('success', 'Success', 'Customer created successfully');
        this.appDialog.visible = false;
        this.resetForm();
        this.onEditProjectEvent.emit();
      });
  }
}

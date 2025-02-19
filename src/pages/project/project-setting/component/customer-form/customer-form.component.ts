import { Component } from '@angular/core';
import { AppForm } from '../../../../../components/app-form/app-form.component';
import { FormGroupProjectCustomer, listFormProjectCustomer } from '../../../../../forms/project-customer';
import { fr } from 'date-fns/locale';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'customer-form',
  imports: [
    AppForm
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerForm {

  listForm = listFormProjectCustomer;
  formGroup: FormGroup = FormGroupProjectCustomer;
}

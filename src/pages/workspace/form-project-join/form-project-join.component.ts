import { Component } from '@angular/core';
import { AppForm, InputAppForm } from '../../../components/app-form/app-form.component';
import { FormGroup } from '@angular/forms';
import { FormGroupProjectJoin, listFormProjectJoin } from '../../../forms/project-join';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'form-project-join',
  imports: [
    AppForm,
    TranslateModule
  ],
  templateUrl: './form-project-join.component.html',
  styleUrl: './form-project-join.component.scss'
})
export class FormProjectJoin {

  listForm: InputAppForm[] = listFormProjectJoin;
  formGroup: FormGroup = FormGroupProjectJoin;
}

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppForm, InputAppForm } from '../../../../../components/app-form/app-form.component';
import { FormGroupSprintCreate, listFormSprintCreate } from '../../../../../forms/sprint-create';
import { SprintModel } from '../../../../../services/sprint/sprint.service';

@Component({
  selector: 'form-sprint',
  imports: [
    AppForm,
  ],
  templateUrl: './form-sprint.component.html',
  styleUrl: './form-sprint.component.scss'
})
export class FormSprint {

  @Input()
  sprintData: SprintModel = <any>{};

  listForm: InputAppForm[] = listFormSprintCreate;
  formGroup: FormGroup = FormGroupSprintCreate;

  ngOnInit() {
    if (this.sprintData) {
      this.formGroup.patchValue(this.sprintData);
    }
  }
}

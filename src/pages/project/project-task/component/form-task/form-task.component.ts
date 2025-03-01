import { Component, Input } from '@angular/core';
import { AppForm, InputAppForm } from '../../../../../components/app-form/app-form.component';
import { FormGroup } from '@angular/forms';
import { TaskModel } from '../../../../../services/task/task.service';
import { FormGroupTaskCreate, listFormTaskCreate } from '../../../../../forms/task-create';

@Component({
  selector: 'form-task',
  imports: [
    AppForm
  ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTask {

  @Input()
  TaskData: TaskModel = <any>{};

  listForm: InputAppForm[] = listFormTaskCreate;
  formGroup: FormGroup = FormGroupTaskCreate;

  ngOnInit() {
    if (this.TaskData) {
      this.formGroup.patchValue(this.TaskData);
    }
  }

}

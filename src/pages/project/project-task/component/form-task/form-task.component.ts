import { Component, Input } from '@angular/core';
import { AppForm, InputAppForm } from '../../../../../components/app-form/app-form.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskScrumModel } from '../../../../../services/task_scrum/task_scrum.service';
import { FormGroupTaskCreate, listFormTaskCreate } from '../../../../../forms/task-create';
import { EditorModule } from 'primeng/editor';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-task',
  imports: [
    CommonModule,
    TranslateModule,
    AppForm,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTask {

  @Input()
  TaskData: TaskScrumModel = <any>{};

  listForm: InputAppForm[] = listFormTaskCreate;
  formGroup: FormGroup = new FormGroup({
    task_name: new FormControl(null, [Validators.required]),
  });;

  taskDescription: string = '';
}

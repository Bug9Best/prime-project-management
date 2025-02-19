import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { listProjectType, ProjectType } from '../../../public/data/project-type';
import { SelectButton } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';

export type InputAppFormType = "text" | "email" | "textarea" | 'editor' | "number" | "date" | "dropdown" | 'checkbox' | 'radio' | 'toggle' | 'file' | "autocomplete" | 'divider' | 'header' | 'project_type';
export class InputAppForm {
  type: InputAppFormType = "text";
  label: string = "default";
  field: string | number | null = null;
  required: boolean = true;
  disabled: boolean = false;
  colWidth: number = 12;
  maxLength?: number = 255;
  options?: any;
  helpText?: string = "";
  filter?: boolean = false;
}

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DividerModule,
    InputTextModule,
    TextareaModule,
    RadioButtonModule,
    SelectButton,
    DatePickerModule
  ],
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.scss'
})
export class AppForm {

  @Input()
  listForm: InputAppForm[] = [];

  @Input()
  formGroup: FormGroup = new FormGroup({});

  @Input()
  toggleOptions: any = []

  listProjectType: ProjectType[] = listProjectType;
  selectedProjectType: any = null;

  invalid(control: any) {
    let formControl = this.formGroup.get(control);
    if (formControl) {
      return formControl.invalid
        && (formControl.touched || formControl.dirty);
    }
    return false;
  }
}

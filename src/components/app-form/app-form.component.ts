import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { listProjectType, ProjectType } from '../../../public/data/project-type';
import { SelectButton } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';

export enum InputAppFormType {
  Text,
  Email,
  Textarea,
  Editor,
  Number,
  Date,
  StartDate,
  EndDate,
  Duration,
  Dropdown,
  Checkbox,
  Radio,
  Toggle,
  File,
  Autocomplete,
  Divider,
  Header,
  ProjectType,
};

export class InputAppForm {
  type: InputAppFormType = InputAppFormType.Text;
  label: string = "default";
  field: string | number | null = null;
  required: boolean = true;
  disabled: boolean = false;
  colWidth: number = 12;
  maxLength?: number = 255;
  options?: any;
  helpText?: string = "";
  filter?: boolean = false;
  isLimitLength?: boolean = false;
  minDate?: Date | null = null;
  min?: number | null = null;
  max?: number | null = null;
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
    InputNumberModule,
    TextareaModule,
    RadioButtonModule,
    SelectButton,
    DatePickerModule
  ],
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.scss'
})
export class AppForm {

  minDate: Date = new Date();
  maxNotesLength: number = 255;
  notesLength: number = 0;
  InputAppFormType = InputAppFormType;

  labelValidation: string = 'app.validation.required';

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

  onTyping(event: any) {
    this.notesLength = event.target.textLength;
    if (this.notesLength > this.maxNotesLength) {
      this.notesLength = this.maxNotesLength;
    }
  }

  setMinDate(event: any) {
    this.minDate = event;
  }
}

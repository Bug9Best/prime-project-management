import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ProjectResourceModel, ProjectResourceService, ProjectResourceType } from '../../../../../services/project-resource/project-resource.service';

@Component({
  selector: 'resource-create-content',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    EditorModule,
    ButtonModule,
    AutoCompleteModule
  ],
  templateUrl: './resource-create-content.component.html',
  styleUrl: './resource-create-content.component.scss'
})
export class ResourceCreateContent {

  formGroup: FormGroup = new FormGroup({
    topic: new FormControl(null, Validators.required),
    resource_type: new FormControl(ProjectResourceType.CONTENT, Validators.required),
    tag: new FormControl(['Content'], Validators.required),
    content: new FormControl(null, Validators.required),
  });

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private projectResourceService: ProjectResourceService
  ) { }

  get tag() {
    return this.formGroup.get('tag') as FormControl;
  }

  resetForm() {
    this.formGroup.reset();
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  filterBlank() {
    let value = this.tag.value;
    if (value) {
      this.tag.setValue(value.filter((item: string) => item.trim() !== ''));
    }
  }

  onValidateForm() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.showMessage('warn', 'Error', 'Please fill all required fields');
      return;
    }

    this.onCreateResource();
  }

  onBackPreviousStepEvent = output<any>();
  onBackPreviousStep() {
    if (this.formGroup.dirty) {
      this.confirmationService.confirm({
        header: 'Confirmation',
        message: 'Are you sure you want to leave this page?',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.resetForm();
          this.onBackPreviousStepEvent.emit(true);
        },
      });
      return;
    }
    this.resetForm();
    this.onBackPreviousStepEvent.emit(true);
  }

  onCreateResourceEvent = output<boolean>();
  onCreateResource() {
    let values = this.formGroup.value as ProjectResourceModel;
    // TODO: Binding User ID and Project ID
    values.project_id = 13;
    values.owner_id = 1;

    this.projectResourceService
      .createProjectResource(values)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Resource created successfully');
          this.projectResourceService.setStateRoload(true);
          this.resetForm();
        },
        error: (error) => {
          this.showMessage('error', 'Error', 'An error occurred while creating resource');
        },
      });
  }
}

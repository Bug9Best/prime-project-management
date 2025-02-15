import { Component, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProjectResourceModel, ProjectResourceService, ProjectResourceType } from '../../../../../services/project-resource/project-resource.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'resource-create-content',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    ButtonModule,
    AutoCompleteModule
  ],
  templateUrl: './resource-create-content.component.html',
  styleUrl: './resource-create-content.component.scss'
})
export class ResourceCreateContent {

  currentUserData: any = {};
  currentProjectId: string = '';

  formGroup: FormGroup = new FormGroup({
    topic: new FormControl(null, Validators.required),
    resource_type: new FormControl(ProjectResourceType.CONTENT, Validators.required),
    tag: new FormControl(['Content'], Validators.required),
    content: new FormControl(null, Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private projectResourceService: ProjectResourceService
  ) {
    this.currentUserData = this.authService.getUserData();
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.currentProjectId = params.get('id')!;
      }
    });
  }

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
    values.project_id = this.currentProjectId;
    values.owner_id = this.currentUserData.id;

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

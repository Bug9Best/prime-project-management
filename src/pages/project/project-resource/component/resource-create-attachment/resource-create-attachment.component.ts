import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectResourceType, ProjectResourceService, ProjectResourceModel, FileAttachment } from '../../../../../services/project-resource/project-resource.service';
import { FileUploadModule } from 'primeng/fileupload';
import { AttachmentsItem } from '../attachment-item/attachment-item.component';
import { FirebaseStorageService } from '../../../../../services/stroage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'resource-create-attachment',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    FileUploadModule,
    AttachmentsItem
  ],
  templateUrl: './resource-create-attachment.component.html',
  styleUrl: './resource-create-attachment.component.scss'
})
export class ResourceCreateAttachment {

  currentUserData: any = {};
  currentProjectId: string = '';

  selectedFiles = [];
  uploadedFiles: any = [];
  fileSizeLimit = 40 * 1024 * 1024; // 40MB

  formGroup: FormGroup = new FormGroup({
    topic: new FormControl(null, Validators.required),
    resource_type: new FormControl(ProjectResourceType.ATTACHMENT, Validators.required),
    tag: new FormControl(['Attachment'], Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private firebaseStorageService: FirebaseStorageService,
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

  // Upload Part
  choose(callback: any) {
    callback();
  }

  onSelectedFiles(event: any) {
    this.selectedFiles = event.currentFiles;
    this.selectedFiles.forEach((file: any) => {
      if (this.isDuplicateFile(file)) {
        return;
      } else {
        this.uploadFile(file);
      }
    });
  }

  isDuplicateFile(file: any): boolean {
    return this.uploadedFiles.some((uploadedFile: any) => uploadedFile.metadata.name === file.name);
  }

  async uploadFile(file: File) {
    try {
      const downloadURL = await this.firebaseStorageService.uploadFile(file);
      this.uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file_url: downloadURL
      } as FileAttachment
      );
    } catch (error) {
      console.error('Upload failed', error);
    }
    this.selectedFiles = [];
  }

  onCreateResourceEvent = output<boolean>();
  onCreateResource() {
    let values = this.formGroup.value as ProjectResourceModel;
    values.project_id = this.currentProjectId;
    values.owner_id = this.currentUserData.id;
    values.attachment = this.uploadedFiles;
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

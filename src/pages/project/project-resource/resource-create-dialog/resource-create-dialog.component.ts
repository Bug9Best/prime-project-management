import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { ResourceTypeSelection } from '../component/resource-type-selection/resource-type-selection.component';
import { ResourceCreateContent } from '../component/resource-create-content/resource-create-content.component';
import { ResourceCreateAttachment } from '../component/resource-create-attachment/resource-create-attachment.component';
import { ProjectResourceService } from '../../../../services/project-resource/project-resource.service';
import { MessageService } from 'primeng/api';

export enum CreateResourceStep {
  SelectType = 1,
  InputData = 2,
}

export enum CreateResourceType {
  None = 0,
  Content = 1,
  Attachment = 2,
}

@Component({
  selector: 'resource-create-dialog',
  imports: [
    CommonModule,
    ResourceTypeSelection,
    ResourceCreateContent,
    ResourceCreateAttachment
  ],
  templateUrl: './resource-create-dialog.component.html',
  styleUrl: './resource-create-dialog.component.scss'
})
export class ResourceCreateDialog {

  Step = CreateResourceStep;
  Type = CreateResourceType;
  currentStep: CreateResourceStep = CreateResourceStep.SelectType;
  currentType: CreateResourceType = CreateResourceType.None;

  constructor(
    private projectResourceService: ProjectResourceService,
  ) {
    this.projectResourceService.stateReload$
      .subscribe((state) => {
        if (state) {
          this.currentStep = CreateResourceStep.SelectType;
          this.currentType = CreateResourceType.None;
          this.projectResourceService.setStateRoload(false);
          this.onCloseDialogEvent.emit(true);
        }
      });
  }

  prevStep(state: boolean) {
    if (!state) return;
    this.currentStep = CreateResourceStep.SelectType;
  }

  onSelectType(data: CreateResourceType) {
    this.currentType = data;
    this.currentStep = CreateResourceStep.InputData;
  }

  messageService = inject(MessageService);
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onCloseDialogEvent = output<any>();
  onCancelCreate(state: boolean) {
    this.onCloseDialogEvent.emit(state);
  }

  onCreateResource(value: boolean) {
    if (!value) return;
    this.showMessage('success', 'Success', 'Resource created successfully');
  }
}

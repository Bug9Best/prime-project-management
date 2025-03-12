import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsModel } from '../../../../services/project/project.service';
import { ProjectMemberService } from '../../../../services/project-member/project-resource.service';

@Component({
  selector: 'project-member-detail',
  imports: [
    CommonModule,
    TranslateModule,
    DrawerModule,
    AvatarModule,
    ButtonModule,
  ],
  templateUrl: './project-member-detail.component.html',
  styleUrl: './project-member-detail.component.scss'
})
export class ProjectMemberDetail {

  @Input()
  memberData: any;

  @Input()
  projectData: ProjectsModel = <any>{};
  visible: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private projectMemberService: ProjectMemberService
  ) { }
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  onConfirm(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to remove this member from project?',
      rejectButtonStyleClass: 'p-button-text p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.onRemoveFormProject(this.projectData.id, item.id);
      }
    });
  }

  onRemoveFormProjectEvent = output<void>();
  onRemoveFormProject(project_id: string, user_id: string) {
    this.projectMemberService
      .removeFromProject(user_id, project_id)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Member removed from project');
          this.onRemoveFormProjectEvent.emit();
          this.visible = false;
        },
        error: (error) => {
          this.showMessage('error', 'Error', 'Error while removing member from project');
        }
      });
  }
}

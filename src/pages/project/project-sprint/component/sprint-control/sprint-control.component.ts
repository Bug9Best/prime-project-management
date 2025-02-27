import { Component, inject, Input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SprintModel, SprintService, SprintStatus } from '../../../../../services/sprint/sprint.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'sprint-control',
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    DividerModule,
    ProgressBarModule
  ],
  templateUrl: './sprint-control.component.html',
  styleUrl: './sprint-control.component.scss'
})
export class SprintControl {

  @Input()
  sprintData: SprintModel = <any>{};
  SprintStatus = SprintStatus;

  get remainingDays(): string {
    if (!this.sprintData) return "";
    let cureentDate = new Date();
    let sprintEndDate = new Date(this.sprintData.end_date);
    let diff = sprintEndDate.getTime() - cureentDate.getTime();
    let result = Math.ceil(diff / (1000 * 3600 * 24));

    if (result < 0) return "detail.sprint.overdue";
    return "Remain " + result + " days";
  }

  messageService = inject(MessageService);
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  sprintService = inject(SprintService);
  onUpdateEvent = output<void>();
  updateSprintStatus(status: SprintStatus) {
    this.sprintService
      .updateStatus({ id: this.sprintData.id, status: status })
      .subscribe({
        next: () => {
          this.showMessage('success', 'Success', 'Sprint status updated successfully');
          this.onUpdateEvent.emit();
        }
      });
  }
}

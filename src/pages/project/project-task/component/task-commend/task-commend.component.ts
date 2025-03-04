import { Component, Input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { TaskLoggingService } from '../../../../../services/task-logging/task-logging.service';
import { TaskModel } from '../../../../../services/task/task.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'task-commend',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    EditorModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './task-commend.component.html',
  styleUrl: './task-commend.component.scss'
})
export class TaskCommend {

  currentUser: any;

  @Input()
  taskData: TaskModel = <any>{};

  formContent: FormGroup = new FormGroup({
    content: new FormControl(null, [Validators.required])
  });

  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private taskLoggingService: TaskLoggingService
  ) {
    this.currentUser = this.auth.getUserData();
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  reserForm() {
    this.formContent.reset();
  }

  onCommentEvent = output<void>();
  onComment() {
    let values = this.formContent.value;
    values.user_id = this.currentUser.id;
    values.task_id = this.taskData.id;
    this.taskLoggingService
      .comment(values)
      .subscribe({
        next: (response) => {
          this.reserForm();
          this.onCommentEvent.emit();
          this.showMessage('success', 'Success', 'Comment success');
        },
        error: (error) => {
          this.showMessage('error', 'Error', 'Comment failed');
        }
      });
  }
}

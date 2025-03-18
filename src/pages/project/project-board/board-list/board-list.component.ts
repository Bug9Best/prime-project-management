import { CommonModule } from '@angular/common';
import { Component, output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ScrollerModule } from 'primeng/scroller';
import { TooltipModule } from 'primeng/tooltip';
import { DragDropModule } from 'primeng/dragdrop';
import { BoardService } from '../../../../services/board/board.service';
import { ActivatedRoute } from '@angular/router';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { FormTask } from '../../project-task/component/form-task/form-task.component';
import { BoardTaskService } from '../../../../services/board-task/board-task.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ProjectContent } from '../../component/project-content/project-content.component';

@Component({
  selector: 'board-list',
  imports: [
    CommonModule,
    PanelModule,
    MenuModule,
    AppDialog,
    AvatarGroupModule,
    AvatarModule,
    TooltipModule,
    ButtonModule,
    ScrollerModule,
    DragDropModule,
    FormTask
  ],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardList {

  projectID: string = '';
  currentUser: any = {};

  labelCreate: string = 'project.button.create.task';
  labelHeader: string = 'project.header.task';

  selectedBoard: any | undefined;
  listBoard: any[] = []
  draggedItem: any | undefined;
  sourceBoard: any | undefined;

  items: MenuItem[] = [
    {
      label: 'Rename',
      icon: 'pi pi-file-edit',
      command: (event) => {
      }
    },
    {
      label: 'Hidden',
      icon: 'pi pi-eye-slash',
      command: (event) => {
        this.onHiddenBoard();
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event) => {
        this.onDeleteBoard();
      }
    },
  ];

  constructor(
    private auth: AuthService,
    private activateRoute: ActivatedRoute,
    private projectContent: ProjectContent,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private boardService: BoardService,
    private boardTaskService: BoardTaskService,
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
    this.currentUser = this.auth.getUserData();
  }

  ngOnInit() {
    this.getBoardList();
  }

  getBoardList() {
    this.boardService
      .getProjectBoard(this.projectID)
      .subscribe((res) => {
        this.listBoard = res;
      });
  }

  resetValues() {
    this.draggedItem = undefined;
    this.sourceBoard = undefined;
  }

  createBoard(data: any) {
    this.listBoard.push({
      id: this.listBoard.length + 1,
      name: data.name,
      items: [],
    } as any);
  }

  onHiddenBoard() {
    this.listBoard.filter((x) => {
      if (x.id === this.selectedBoard?.id) {
        x.isHidden = true;
      }
    });
  }

  onToggleHidden(board: any) {
    this.listBoard.filter((x) => {
      if (x.id === board?.id) {
        x.isHidden = false;
      }
    });
  }

  onDeleteBoard() {
    if (!this.selectedBoard) return
    this.confirmationService.confirm({
      message: 'ต้องการลบบอร์ดนี้ใช่หรือไม่',
      accept: () => {
        this.deleteBoard();
      },
    });
  }

  deleteBoard() {
    this.listBoard = this.listBoard.filter((x) => x.id !== this.selectedBoard?.id);
    this.showMessage('success', 'Success', 'Delete board success');
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onOpenCreate(board: any) {
    this.appDialog.visible = true;
    this.selectedBoard = board;
  }

  resetForm() {
    this.formTask.formGroup.reset();
  }

  onCancelForm() {
    this.appDialog.visible = false;
    this.resetForm();
  }

  @ViewChild(FormTask) formTask!: FormTask;
  onValidateForm() {
    if (this.formTask.formGroup.invalid) {
      this.formTask.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formTask.formGroup.value;
    values.board_id = this.selectedBoard.id;
    values.project_id = this.projectID;
    values.user_id = this.currentUser.id;
    values.task_description = this.formTask.taskDescription;
    this.onCreateTask(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onCreateTask(param: any) {
    this.boardTaskService
      .create(param)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Create task success');
          this.appDialog.visible = false;
          this.resetForm();
          this.getBoardList();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Create task failed');
        }
      });
  }

  viewDetail(task: any) {
    this.projectContent.setBoardState(true, task.id);
  }

  onDragStart(item: any) {
    this.draggedItem = item;
  }

  onDropItem(targetColumn: any) {
    this.sourceBoard = targetColumn;
  }

  onDragEnd(task: any, board: any) {
    this.boardTaskService.
      updateBoard(this.draggedItem.id, this.sourceBoard.id)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Update board success');
          this.getBoardList();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Update board failed');
        }
      });
  }
}

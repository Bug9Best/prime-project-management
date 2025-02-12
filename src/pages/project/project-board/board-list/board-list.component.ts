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

@Component({
  selector: 'board-list',
  imports: [
    CommonModule,
    PanelModule,
    MenuModule,
    AvatarGroupModule,
    AvatarModule,
    TooltipModule,
    ButtonModule,
    ScrollerModule,
    DragDropModule
  ],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardList {

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
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event) => {
        this.onDeleteBoard();
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

  selectedBoard: any | undefined;
  listBoard: any[] = [
    {
      id: 1,
      name: 'To Do',
      items: [
        { id: 1, title: 'Task 1', description: "Description 1", due_date: '18 กันยายน 2024' },
        { id: 2, title: 'Task 2', description: "Description 2", due_date: '20 กันยายน 2024' }
      ]
    },
    {
      id: 2,
      name: 'In Progress',
      items: [
        { id: 3, title: 'Task 3', description: "Description 3", due_date: '21 กันยายน 2024' }
      ]
    },
    {
      id: 3,
      name: 'Done',
      items: [
        { id: 4, title: 'Task 4', description: "Description 4", due_date: '16 กันยายน 2024' }
      ]
    }
  ]
  sourceBoard: any | undefined;
  draggedItem: any | undefined;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  resetValues() {
    this.draggedItem = undefined;
    this.sourceBoard = undefined;
  }

  onDragStart(column: any, item: any) {
    this.sourceBoard = column;
    this.draggedItem = item;
  }

  onDragEnd() {
    this.resetValues();
  }

  onDropItem(targetColumn: any) {
      
  }

  createBoard(data: any) {
    this.listBoard.push({
      id: this.listBoard.length + 1,
      name: data.name,
      items: [],
    } as any);
  }

  onViewDetail = output<any>();
  viewDetail(board: any, item: any) {
    this.onViewDetail.emit({ board, item });
  }


  onOpenCreate(board: any) {
    this.selectedBoard = board;
  }

  onCreateTask(value: any) {
    if (!this.selectedBoard) return
    let values: any = {
      id: this.selectedBoard?.items.length + 1,
      title: value.name,
      description: "",
      due_date: "",
    }
    this.selectedBoard.items.push(values);
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
    this.successMessage();
  }

  successMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Board has been deleted successfully',
    });
  }

  errorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Board has not been deleted',
    });
  }
}

import { Component, output, ViewChild } from '@angular/core';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { UserRoleTag } from '../user-role-tag/user-role-tag.component';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from '../../../../helper/pipe/thdate.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'user-detail-dialog',
  imports: [
    CommonModule,
    AppDialog,
    TranslateModule,
    ThaiDatePipe,
    DividerModule,
    UserRoleTag,
    ButtonModule
  ],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.scss'
})
export class UserDetailDialog {

  userData?: any = {};
  header: string = 'detail.user.header';
  labelName: string = 'detail.user.name';
  labelEmail: string = 'detail.user.email';
  labelRole: string = 'detail.user.role';
  labelCreateDate: string = 'detail.user.createDate';
  labelBio: string = 'detail.user.bio';
  labelProjectCreated: string = 'detail.user.project_created';
  labelProjectCreatedCounting: string = 'detail.user.project_created_counting';
  labelProjectJoined: string = 'detail.user.project_joined';
  labelProjectJoinedCounting: string = 'detail.user.project_joined_counting';
  buttonBlock: string = 'app.button.block';
  buttonUnblock: string = 'app.button.unblock';
  buttonClose: string = 'app.button.close';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) { }

  @ViewChild(AppDialog) dialog!: AppDialog;
  showDialog(user_data: any) {
    this.dialog.visible = true;
    this.userData = user_data;
  }

  closeDialog() {
    this.dialog.visible = false;
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  onConfirmBlock() {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Are you sure that you want to block this user?',
      message: 'if you block this user, this user will not be able to access the system anymore.',
      accept: () => {
        this.onBlockUser();
      }
    });
  }

  onConfirmUnblock() {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Are you sure that you want to unblock this user?',
      message: 'if you unblock this user, this user will be able to access the system again.',
      accept: () => {
        this.onUnblockUser();
      }
    });
  }

  onReloadUser = output<boolean>();
  onUnblockUser() {
    if (!this.userData) return;
    this.userService.unblockUser(this.userData.id).subscribe({
      next: (res) => {
        this.showMessage('success', 'Success', 'User has been unblocked successfully.');
        this.dialog.visible = false;
        this.onReloadUser.emit(true);
      },
      error: (err) => {
        this.showMessage('error', 'Error', 'An error occurred while unblocking user.');
        this.onReloadUser.emit(false);
        console.log(err);
      }
    });
  }

  onBlockUser() {
    if (!this.userData) return;
    this.userService.blockUser(this.userData.id).subscribe({
      next: (res) => {
        this.showMessage('success', 'Success', 'User has been blocked successfully.');
        this.onReloadUser.emit(true);
        this.dialog.visible = false;
      },
      error: (err) => {
        this.showMessage('error', 'Error', 'An error occurred while blocking user.');
        this.onReloadUser.emit(false);
        console.log(err);
      }
    });
  }
}

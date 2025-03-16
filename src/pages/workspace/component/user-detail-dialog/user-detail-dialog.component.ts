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
  labelProjectCreated: string = 'detail.user.projectCreated';
  labelProjectCreatedCounting: string = 'detail.user.projectCreatedCounting';
  labelProjectJoined: string = 'detail.user.projectJoined';
  labelProjectJoinedCounting: string = 'detail.user.projectJoinedCounting';
  buttonPromote: string = 'app.button.promote';
  buttonDemote: string = 'app.button.demote';
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
      key : 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  onConfirmPromote() {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Are you sure that you want to block this user?',
      message: 'if you block this user, this user will not be able to access the system anymore.',
      accept: () => {
        this.onUpdateRole('ADMIN');
      }
    });
  }

  onConfirmDemote() {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Are you sure that you want to change role this user?',
      message: 'if you change role this user, this user will not be able to access the system anymore.',
      accept: () => {
        this.onUpdateRole('USER');
      }
    });
  }

  onReloadUser = output<boolean>();
  onUpdateRole(role: string = 'USER') {
    if (!this.userData) return;
    this.userService
      .updateRole(this.userData.id, role)
      .subscribe({
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
}

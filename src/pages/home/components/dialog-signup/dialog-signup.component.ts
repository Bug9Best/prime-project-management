import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'dialog-signup',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DialogModule
  ],
  templateUrl: './dialog-signup.component.html',
  styleUrl: './dialog-signup.component.scss'
})
export class DialogSignup {

  visible: boolean = false;

  showDialog(): void {
    this.visible = true;
  }
}

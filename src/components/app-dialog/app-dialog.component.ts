import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog',
  imports: [
    CommonModule,
    TranslateModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './app-dialog.component.html',
  styleUrl: './app-dialog.component.scss'
})
export class AppDialog {

  data = input<any>();

  showButton = input(true);
  showFooter = input(true);
  icon = input('pi pi-plus');
  label = input('Open Dialog');
  buttonStyleClass = input('border-round-lg');

  visible: boolean = false;
  header = input('Dialog Header');
  modal = input(true);
  draggable = input(false);
  resizable = input(false);
  closable = input(true);
  width = input('50vw');
  maxWidth = input('80vw');
  height = input();
  closeOnEscape = input(true);
  dismissableMask = input(true);
  showHeader = input(true);
  submitLabel = input('app.button.create');
  cancelLabel = input('app.button.cancel');
  submitIcon = input('pi pi-save');

  onSubmitEvent = output<void>();
  onSubmit() {
    this.onSubmitEvent.emit();
  }

  onCancelEvent = output<void>();
  onCancel() {
    this.onCancelEvent.emit();
  }
}

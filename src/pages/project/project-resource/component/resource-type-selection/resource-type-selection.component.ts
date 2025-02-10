import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { ResourceType } from '../../../../../../public/data/resource-type';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'resource-type-selection',
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './resource-type-selection.component.html',
  styleUrl: './resource-type-selection.component.scss'
})
export class ResourceTypeSelection {

  selectedType: number = 0;
  listType: any[] = ResourceType;

  resetSelection() {
    this.selectedType = 0;
  }

  onCancelCreateEvent = output<any>();
  onCancelCreate() {
    this.onCancelCreateEvent.emit(false);
    this.resetSelection();
  }

  onSelectTypeEvent = output<any>();
  onSelectedType() {
    if (!this.selectedType) return;
    this.onSelectTypeEvent.emit(this.selectedType);
    this.resetSelection();
  }
}

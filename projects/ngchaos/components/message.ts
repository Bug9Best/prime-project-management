import { Component, Input } from "@angular/core";

@Component({
  selector: 'c-message',
  standalone: true,
  template: `
    <div class="flex align-items-center justify-content-center" style="min-height: 350px;">
      <div class="text-center text-gray-500">
        <div>
          <span class="material-symbols-outlined text-4xl">
            {{ icon }}
          </span>
        </div>
        <div class="text-lg mb-3">
          {{ label }}
        </div>
        <ng-content>
          {{ text }}
        </ng-content>
      </div>
    </div>
  `
})
export class ChaosMessage {
  
  @Input()
  icon: string = 'error_outline';
  
  @Input()
  label: string = 'ไม่พบข้อมูล';
  
  @Input()
  text: string = '';
}
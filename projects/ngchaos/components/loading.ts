import { Component, input } from "@angular/core";
import { ProgressBarModule } from "primeng/progressbar";

@Component({
  selector: 'c-loading',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div class="p-5 text-center text-gray-600">
      <div class="py-3">
        <p-progressBar
          [style]="{
            margin: '0 auto',
            height: '8px', 
            maxWidth: '350px'
          }"
          styleClass="bg-white border-1 border-400"
          color="red"
          mode="indeterminate">
        </p-progressBar>
      </div>
      <div class="text-xl text-gray-500">
        <ng-content>
          {{ text() }}
        </ng-content>
      </div>
    </div>
  `
})
export class ChaosLoading {
  text = input<string>('กำลังโหลดข้อมูล...');
}
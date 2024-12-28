import { Component, input, model } from "@angular/core";
import { AvatarModule } from "primeng/avatar";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'c-user',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    RouterModule
  ],
  template: `
    <div class="flex align-items-center">
      <div class="py-1">
        <p-avatar
          [style]="{ width: size(), height: size() }"
          [image]="pictureUrl() || 'assets/user.png'"
          styleClass="bg-gray-100 text-red-600 shadow-1 border-1 border-gray-400"
          shape="circle">
        </p-avatar>
      </div>
      <div class="px-3 hidden lg:block" [style]="{ minWidth: '200px' }">
        <div class="text-lg text-overflow-ellipsis overflow-hidden white-space-nowrap line-height-2" [style]="{ maxWidth: maxWidth() }">
          {{ name() || '...' }}
        </div>
        <div class="text-sm text-overflow-ellipsis overflow-hidden white-space-nowrap" [style]="{ maxWidth: maxWidth() }">
          {{ text() || '' }}
        </div>
      </div>
    </div>
  `
})
export class ChaosUser {
  size = model('35px');
  name = model<string>();
  pictureUrl = model<string>();
  text = model<string>();
  routerLink = input<string|string[]>();
  maxWidth = input<string>('230px');
}
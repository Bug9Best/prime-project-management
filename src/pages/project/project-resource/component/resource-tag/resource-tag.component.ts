import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'resource-tag',
  imports: [
    TagModule
  ],
  templateUrl: './resource-tag.component.html',
  styleUrl: './resource-tag.component.scss'
})
export class ResourceTag {

  value = input<string>()
}

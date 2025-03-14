import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InplaceModule } from 'primeng/inplace';
import { ResourceTag } from '../component/resource-tag/resource-tag.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectResourceModel, ProjectResourceType } from '../../../../services/project-resource/project-resource.service';
import { FormsModule } from '@angular/forms';
import { AttachmentsItem } from '../component/attachment-item/attachment-item.component';

@Component({
  selector: 'resource-list',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    InplaceModule,
    DividerModule,
    AvatarModule,
    CardModule,
    ResourceTag,
    AttachmentsItem
  ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.scss'
})
export class ResourceList {

  buttonShowLabel: string = 'project.button.resource.show'
  buttonHideLabel: string = 'project.button.resource.hide'

  ProjectResourceType = ProjectResourceType
  listResource = input<ProjectResourceModel[]>()

  onToggleMenuEvent = output<any>()
  onToggleMenu(event: any, resource: ProjectResourceModel) {
    this.onToggleMenuEvent.emit({ event: event, data: resource })
  }
}

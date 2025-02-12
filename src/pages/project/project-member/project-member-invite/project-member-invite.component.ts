import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'project-member-invite',
  imports: [
    TranslateModule,
    InputTextModule
  ],
  templateUrl: './project-member-invite.component.html',
  styleUrl: './project-member-invite.component.scss'
})
export class ProjectMemberInvite {

}

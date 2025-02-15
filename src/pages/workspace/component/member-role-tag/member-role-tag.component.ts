import { Component, input } from '@angular/core';
import { UserRole } from '../../../../services/auth/auth.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'member-role-tag',
  imports: [
    TagModule
  ],
  templateUrl: './member-role-tag.component.html',
  styleUrl: './member-role-tag.component.scss'
})
export class MemberRoleTag {

  UserRole = UserRole;
  role = input<UserRole>(UserRole.User);

}

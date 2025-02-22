import { Component, input } from '@angular/core';
import { UserRole } from '../../../../services/auth/auth.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'user-role-tag',
  imports: [
    TagModule
  ],
  templateUrl: './user-role-tag.component.html',
  styleUrl: './user-role-tag.component.scss'
})
export class UserRoleTag {

  UserRole = UserRole;
  role = input<UserRole>(UserRole.User);
  styleClass = input<string>('w-full');
}

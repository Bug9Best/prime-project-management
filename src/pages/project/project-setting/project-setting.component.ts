import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SettingGeneral } from './setting-general/setting-general.component';
import { SettingCustomer } from './setting-customer/setting-customer.component';
import { SettingNotification } from './setting-notification/setting-notification.component';
import { SettingPrivacy } from './setting-privacy/setting-privacy.component';

@Component({
  selector: 'project-setting',
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    AppHeader,
    SettingGeneral,
    SettingCustomer,
    SettingNotification,
    SettingPrivacy
  ],
  templateUrl: './project-setting.component.html',
  styleUrl: './project-setting.component.scss'
})
export class ProjectSetting {

  title: string = 'project.title.setting';
  subtitle: string = 'project.subtitle.setting';
}

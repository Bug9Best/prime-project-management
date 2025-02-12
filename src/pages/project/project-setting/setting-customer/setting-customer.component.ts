import { Component } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';

@Component({
  selector: 'setting-customer',
  imports: [
    AppDialog,
    ScrollPanelModule
  ],
  templateUrl: './setting-customer.component.html',
  styleUrl: './setting-customer.component.scss'
})
export class SettingCustomer {

  labelProjectName: string = 'PROJECT_MENU_SETTING_TITLE';
  labelProjectType: string = 'PROJECT_MENU_SETTING_SUBTITLE';
  labelProjectOwner: string = 'PROJECT_MENU_SETTING_STATUS';
  labelProjectCreatedDate: string = 'PROJECT_MENU_SETTING_STATUS';
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { SettingGeneral } from './setting-general/setting-general.component';
import { SettingCustomer } from './setting-customer/setting-customer.component';
import { SettingPrivacy } from './setting-privacy/setting-privacy.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, ProjectsModel } from '../../../services/project/project.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'project-setting',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    TabViewModule,
    AppHeader,
    SettingGeneral,
    SettingCustomer,
    SettingPrivacy
  ],
  templateUrl: './project-setting.component.html',
  styleUrl: './project-setting.component.scss'
})
export class ProjectSetting {

  currentUser: any = {};
  projectID: string = '';
  projectData: ProjectsModel = <any>{};
  owner_id: string = '';

  title: string = 'project.title.setting';
  subtitle: string = 'project.subtitle.setting';

  constructor(
    private auth: AuthService,
    private activateRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });

    this.currentUser = this.auth.getUserData();
  }

  ngOnInit() {
    if (!this.projectID) return;
    this.getProjectData();
  }

  getProjectData() {
    this.projectService
      .getOne(this.projectID)
      .subscribe((data: any) => {
        this.projectData = data;
        this.owner_id = data.owner_id;
      });
  }
}

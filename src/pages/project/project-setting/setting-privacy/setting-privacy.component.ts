import { Component, ViewChild } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProjectService, ProjectsModel } from '../../../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'setting-privacy',
  imports: [
    ButtonModule,
    DividerModule,
    ConfirmDialogModule
  ],
  templateUrl: './setting-privacy.component.html',
  styleUrl: './setting-privacy.component.scss'
})
export class SettingPrivacy {

  projectID: string = '';
  projectData?: ProjectsModel;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
  ) {
    this.activateRoute.params
      .subscribe((params) => {
        if (params['id']) {
          this.projectID = params['id'];
        }
      });
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService
      .getOne(this.projectID)
      .subscribe((project) => {
        this.projectData = project;
      });
  }

  onConfirmArchive() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to archive this project?',
      header: 'Archive Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.archiveProject();
      },
    });
  }

  archiveProject() {
  }

  onConfirmDelete() {
    const project_name = this.projectData?.project_name;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete <b>' + project_name + '</b> project?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProject();
      },
    });
  }

  deleteProject() {
    this.projectService
      .delete(this.projectID)
      .subscribe(() => {
        this.router.navigate(['/workspace']);
      });
  }
}

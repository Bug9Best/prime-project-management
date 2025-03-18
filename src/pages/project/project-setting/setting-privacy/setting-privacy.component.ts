import { Component, Input, output, ViewChild } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ProjectService, ProjectsModel } from '../../../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'setting-privacy',
  imports: [
    TranslateModule,
    ButtonModule,
    DividerModule,
    ConfirmDialogModule
  ],
  templateUrl: './setting-privacy.component.html',
  styleUrl: './setting-privacy.component.scss'
})
export class SettingPrivacy {

  projectID: string = '';

  @Input()
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
    console.log(this.projectData);
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

  onConfirmUnArchive() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unarchive this project?',
      header: 'Unarchive Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.unArchiveProject();
      },
    });
  }

  archiveProject() {
    this.projectService
      .archiveProject(this.projectID)
      .subscribe(() => {
        this.router.navigate(['/workspace']);
      });
  }

  unArchiveProjectEvent = output()
  unArchiveProject() {
    this.projectService
      .unArchiveProject(this.projectID)
      .subscribe(() => {
        this.unArchiveProjectEvent.emit();
      });
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

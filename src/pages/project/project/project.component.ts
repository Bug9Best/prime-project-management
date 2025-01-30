import { Component, ViewChild } from '@angular/core';
import { ProjectTopbar } from '../component/project-topbar/project-topbar.component';
import { ProjectSidebar } from '../component/project-sidebar/project-sidebar.component';
import { ProjectContent } from '../component/project-content/project-content.component';
import { ProjectFooter } from '../component/project-footer/project-footer.component';
import { ProjectService } from '../../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';

type ProjectType = 'SCRUM' | 'WATERFALL' | 'KANBAN';

@Component({
  selector: 'project-page',
  imports: [
    ProjectTopbar,
    ProjectSidebar,
    ProjectContent,
    // ProjectFooter
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectPage {

  currentTabIndex: number = 0;
  projectType: ProjectType = 'SCRUM';

  projectID: string = '';
  projectData: any = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.projectID = params.get('id')!;
        this.getProject();
      }
    });
  }

  @ViewChild(ProjectSidebar) projectSidebar!: ProjectSidebar;
  getProject() {
    this.projectService.getOne(this.projectID)
      .subscribe((response: any) => {
        this.projectData = response;
        this.projectType = this.projectData.project_type;
        this.projectSidebar.checkProjectType(this.projectType);
      });
  }
}

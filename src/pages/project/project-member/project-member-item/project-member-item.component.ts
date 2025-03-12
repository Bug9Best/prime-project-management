import { Component, Input, ViewChild } from '@angular/core';
import { ProjectMemberDetail } from '../project-member-detail/project-member-detail.component';
import { AvatarModule } from 'primeng/avatar';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, ProjectsModel } from '../../../../services/project/project.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'project-member-item',
  imports: [
    AvatarModule,
    ProjectMemberDetail,
    ProgressBarModule,
    TooltipModule,
    TranslateModule
  ],
  templateUrl: './project-member-item.component.html',
  styleUrl: './project-member-item.component.scss'
})
export class ProjectMemberItem {

  projectID: string = '';
  projectData: ProjectsModel = <any>{};
  listMember: any = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private projectService: ProjectService,

  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit() {
    this.getProjecct();
    this.getProjecctMember();
  }

  getProjecct() {
    if (!this.projectID) return;
    this.projectService
      .getOne(this.projectID)
      .subscribe((data) => {
        this.projectData = data;
      });
  }

  getProjecctMember() {
    if (!this.projectID) return;
    this.projectService
      .getProjectMembers(this.projectID)
      .subscribe((data) => {
        this.listMember = data;
        console.log(this.listMember);
      });
  }

  getTaskProgress(member: any): number {
    if (!member) return 0;
    let total = member.todo_tasks + member.doing_tasks + member.done_tasks;
    let completed = member.done_tasks;
    let progress = Math.ceil((completed / total) * 100);
    return progress;
  }

  @ViewChild(ProjectMemberDetail)
  memberDetail!: ProjectMemberDetail;
  onSelectMember(member: any) {
    this.memberDetail.memberData = member;
    this.memberDetail.visible = !this.memberDetail.visible;
  }
}

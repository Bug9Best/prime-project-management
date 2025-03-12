import { Component, Input, ViewChild } from '@angular/core';
import { ProjectMemberDetail } from '../project-member-detail/project-member-detail.component';
import { AvatarModule } from 'primeng/avatar';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, ProjectsModel } from '../../../../services/project/project.service';

@Component({
  selector: 'project-member-item',
  imports: [
    AvatarModule,
    ProjectMemberDetail
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


  @ViewChild(ProjectMemberDetail)
  memberDetail!: ProjectMemberDetail;
  onSelectMember(member: any) {
    this.memberDetail.memberData = member;
    this.memberDetail.visible = !this.memberDetail.visible;
  }
}

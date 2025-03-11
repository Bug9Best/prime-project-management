import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { NgxGanttModule } from '@worktile/gantt';
import {
  GanttBaselineItem,
  GanttDate,
  GanttDragEvent,
  GanttItem,
  GanttLinkDragEvent,
  GanttPrintService,
  GanttSelectedEvent,
  GanttTableDragDroppedEvent,
  GanttTableDragEndedEvent,
  GanttTableDragEnterPredicateContext,
  GanttTableDragStartedEvent,
  GanttToolbarOptions,
  GanttView,
  GanttViewType,
  NgxGanttComponent,
  addDays,
  getUnixTime,
} from '@worktile/gantt';
import { of, delay, finalize } from 'rxjs';
import { GanttConfigProvider } from '../../../config/gantt.config';
import { TaskScrumService } from '../../../services/task_scrum/task_scrum.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectContent } from '../component/project-content/project-content.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'project-gantt',
  imports: [
    CommonModule,
    AppHeader,
    AppEmpty,
    NgxGanttModule,
    // ThyButtonModule,
    // ThyButton,
  ],
  providers: [GanttPrintService, GanttConfigProvider],
  templateUrl: './project-gantt.component.html',
  styleUrl: './project-gantt.component.scss'
})
export class ProjectGantt {

  projectID: string = '';

  title: string = 'project.title.gantt';
  subtitle: string = 'project.subtitle.gantt';
  emptyTaskTitle: string = 'project.empty.task.title';
  emptyTaskDescription: string = 'project.empty.task.description';

  loading = false;
  isBaselineChecked = false;
  viewType: GanttViewType = GanttViewType.month;
  selectedViewType: GanttViewType = GanttViewType.month;
  toolbarOptions: GanttToolbarOptions = {
    viewTypes: [GanttViewType.day, GanttViewType.month, GanttViewType.year]
  };

  views = [
    { name: 'day', value: GanttViewType.day },
    { name: 'month', value: GanttViewType.month },
    { name: 'year', value: GanttViewType.year }
  ];

  viewsToolBar = [
    { name: 'hour', value: GanttViewType.hour },
    { name: 'day', value: GanttViewType.day },
    { name: 'week', value: GanttViewType.week },
    { name: 'month', value: GanttViewType.month },
    { name: 'quarter', value: GanttViewType.quarter },
    { name: 'year', value: GanttViewType.year }
  ];

  baselineItems: GanttBaselineItem[] = [];

  options = {
    viewType: GanttViewType.day
  };

  items: GanttItem[] = [];

  constructor(
    private messageService: MessageService,
    private projectContent: ProjectContent,
    private activateRoute: ActivatedRoute,
    private printService: GanttPrintService,
    private taskService: TaskScrumService,
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit(): void {
    this.getProjectTask();
  }

  ngAfterViewInit() {
    setTimeout(() => this.ganttComponent
      .scrollToDate(
        new GanttDate(new Date()).getUnixTime()
      ), 200);
  }

  getProjectTask() {
    this.taskService
      .getProjectTask(this.projectID)
      .subscribe((res: any) => {
        this.items = res.map((item: any) => {
          item.title = item.task_name;
          item.start = item.start_date ? this.getDate(new Date(item.start_date)) : null;
          item.end = item.end_date ? this.getDate(new Date(item.end_date)) : null;
          return item;
        });
      });
  }

  getDate(date: any): any {
    return new GanttDate(date).value;
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  barClick(event: any) {
    let item = event.item;
    this.projectContent.setGanttState(true, item.id);
  }

  itemClick(event: any) {
    let item = event.current;
    this.projectContent.setGanttState(true, item.id);
  }

  dragEnded(event: GanttDragEvent) {
    let item = event.item as any;
    item.start_date = new Date(this.getDate(item.start)).toLocaleDateString();
    item.end_date = this.getDate(item.end).toLocaleDateString();
    this.taskService
      .update(item.id, item)
      .subscribe({
        next: (res: any) => {
          this.getProjectTask();
          this.showMessage('success', 'Success', 'Update task successfully');
        },
        error: (error: any) => {
          console.log('dragEnded', error);
        }
      });
  }

  @HostBinding('class.gantt-example-component') class = true;
  @ViewChild('gantt') ganttComponent!: NgxGanttComponent;
  dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
    return true;
  };

  selectedChange(event: GanttSelectedEvent) {
    if (!event) return;
    // event.current && this.ganttComponent.scrollToDate(event.current.start as number);
  }

  linkDragEnded(event: GanttLinkDragEvent) {
    this.items = [...this.items];
    console.log('linkDragEnded', event);
  }

  print(name: string) {
    this.printService.print(name);
  }

  scrollToToday() {
    this.ganttComponent.scrollToToday();
  }

  switchChange() {
    if (this.isBaselineChecked) {
      this.baselineItems = [
        { id: '000000', start: 1627728888, end: 1628421197 },
        { id: '000001', start: 1617361997, end: 1625483597 },
        { id: '000002', start: 1610536397, end: 1610622797 },
        { id: '000003', start: 1628507597, end: 1633345997 },
        { id: '000004', start: 1624705997 }
      ];
    } else {
      this.baselineItems = [];
    }
  }

  selectView(type: GanttViewType) {
    this.viewType = type;
    this.selectedViewType = type;
    console.log('selectView', type);
  }

  viewChange(event: GanttView) {
    this.selectedViewType = event.viewType;
  }

  refresh() {
    this.loading = true;
    this.getProjectTask();
  }

  onDragDropped(event: GanttTableDragDroppedEvent) {
    const sourceItems = event.sourceParent?.children || this.items;
    sourceItems.splice(sourceItems.indexOf(event.source), 1);
    if (event.dropPosition === 'inside') {
      event.target.children = [...(event.target.children || []), event.source];
    } else {
      const targetItems = event.targetParent?.children || this.items;
      if (event.dropPosition === 'before') {
        targetItems.splice(targetItems.indexOf(event.target), 0, event.source);
      } else {
        targetItems.splice(targetItems.indexOf(event.target) + 1, 0, event.source);
      }
    }
    this.items = [...this.items];
  }

  onDragStarted(event: GanttTableDragStartedEvent) {
    console.log('拖拽开始了', event);
  }

  onDragEnded(event: GanttTableDragEndedEvent) {
    console.log('拖拽结束了', event);
  }
}

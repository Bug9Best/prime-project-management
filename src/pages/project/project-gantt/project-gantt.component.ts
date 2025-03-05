import { CommonModule } from '@angular/common';
import { Component, HostBinding, ViewChild } from '@angular/core';
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
import { TaskService } from '../../../services/task/task.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';

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

  getDate(date: any): any {
    return new GanttDate(date).value;
  }

  items: GanttItem[] = [];

  constructor(
    private printService: GanttPrintService,
    private taskService: TaskService,
  ) {
  }

  @HostBinding('class.gantt-example-component') class = true;
  @ViewChild('gantt') ganttComponent!: NgxGanttComponent;

  dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
    return true;
  };


  ngOnInit(): void {
    this.items.forEach((item, index) => {
      if (index % 5 === 0) {
        item.children = this.randomItems(this.random(1, 5), item);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.ganttComponent.scrollToDate(1627729997), 200);
  }

  dragEnded(event: GanttDragEvent) {
    this.items = [...this.items];
  }

  selectedChange(event: GanttSelectedEvent) {
    if (!event) return;
    event.current && this.ganttComponent.scrollToDate(event.current.start as number);
  }

  linkDragEnded(event: GanttLinkDragEvent) {
    this.items = [...this.items];
  }

  barClick(event: any) {
    // this.issueDetail.showDialog(event.item);
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
    of(this.randomItems(30))
      .pipe(
        delay(2000),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        this.items = res;
      });
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

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  randomItems(length: number, parent?: GanttItem, group?: string) {
    const items = [];
    for (let i = 0; i < length; i++) {
      const start = addDays(new Date(), this.random(-200, 200));
      const end = addDays(start, this.random(0, 100));
      items.push({
        id: `${parent?.id || group || ''}${Math.floor(Math.random() * 100000000)}`,
        title: `${parent?.title || 'Task'}-${i}`,
        start: getUnixTime(start),
        end: getUnixTime(end),
        group_id: group,
        expandable: true
      });
    }
    return items;
  }
}

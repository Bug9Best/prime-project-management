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

@Component({
  selector: 'project-gantt',
  imports: [
    CommonModule,
    AppHeader,
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

  items: GanttItem[] = [
    { id: '000000', title: 'Task lorem10adasfmsndglkmsdklmlsdmflkmeakflmadklsfmlkamsdlkfmldsafkmdsklaf', start: 1627729997, end: 1627769997 },
    { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597, links: ['000003', '000004', '0000029'] },
    { id: '000002', title: 'Task 2', start: 1610536397, end: 1610622797, progress: 0.5 },
    { id: '000003', title: 'Task 3 ', start: 1628507597, end: 1633345997, itemDraggable: false },
    { id: '000004', title: 'Task 4', start: 1624705997 },
    { id: '000005', title: 'Task 5', start: 1628075597, end: 1629544397, color: '#709dc1' },
    { id: '000006', title: 'Task 6', start: 1641121997, end: 1645528397 },
    { id: '000007', title: 'Task 7', start: 1639393997, end: 1640862797 },
    { id: '000008', title: 'Task 8', end: 1628783999, color: '#709dc1' },
    { id: '000009', title: 'Task 9', start: 1639307597, end: 1640344397 },
    { id: '0000010', title: 'Task 10', start: 1609067597, end: 1617275597 },
    { id: '0000011', title: 'Task 11', start: 1611918797, end: 1611918797 },
    { id: '0000012', title: 'Task 12', start: 1627816397, end: 1631358797 },
    { id: '0000013', title: 'Task 13', start: 1625051597, end: 1630667597, links: ['0000012'] },
    { id: '0000014', title: 'Task 14', start: 1627920000, end: 1629129599 },
    { id: '0000015', title: 'Task 15', start: 1633259597, end: 1639480397 },
    { id: '0000016', title: 'Task 16', start: 1624965197, end: 1627211597 },
    { id: '0000017', title: 'Task 17', start: 1641035597, end: 1649157197 },
    { id: '0000018', title: 'Task 18', start: 1637061197, end: 1642677197 },
    { id: '0000019', title: 'Task 19', start: 1637925197, end: 1646305997 },
    { id: '0000020', title: 'Task 20', start: 1628334797, end: 1629889997 },
    { id: '0000021', title: 'Task 21', start: 1622891597, end: 1627643597 },
    { id: '0000022', title: 'Task 22', start: 1616238797, end: 1620731597 },
    { id: '0000023', title: 'Task 23', start: 1626693197, end: 1630149197 },
    { id: '0000024', title: 'Task 24', start: 1626174797, end: 1626952397 },
    { id: '0000025', title: 'Task 25', start: 1631013197, end: 1637493197 },
    { id: '0000026', title: 'Task 26', start: 1635937997, end: 1643886797 },
    { id: '0000027', title: 'Task 27', start: 1637665997, end: 1644059597 },
    { id: '0000028', title: 'Task 28', start: 1611400397, end: 1615547597 },
    { id: '0000029', title: 'Task 29', start: 1618053197, end: 1619176397 },
    { id: '0000030', title: 'Task 30', start: 1627729997, end: 1628421197 },
    { id: '0000031', title: 'Task 31', start: 1627729997, end: 1628421197 },
    { id: '0000032', title: 'Task 32', start: 1627729997, end: 1628421197 },
    { id: '0000033', title: 'Task 33', start: 1627729997, end: 1628421197 },
    { id: '0000034', title: 'Task 34', start: 1627729997, end: 1628421197 },
    { id: '0000035', title: 'Task 35', start: 1627729997, end: 1628421197 },
    { id: '0000036', title: 'Task 36', start: 1627729997, end: 1628421197 },
    { id: '0000037', title: 'Task 37', start: 1627729997, end: 1628421197 },
    { id: '0000038', title: 'Task 38', start: 1627729997, end: 1628421197 },
    { id: '0000039', title: 'Task 39', start: 1627729997, end: 1628421197 },
    { id: '0000040', title: 'Task 40', start: 1627729997, end: 1628421197 },
    { id: '0000041', title: 'Task 41', start: 1627729997, end: 1628421197 },
    { id: '0000042', title: 'Task 42', start: 1627729997, end: 1628421197 },
    { id: '0000043', title: 'Task 43', start: 1627729997, end: 1628421197 },
    { id: '0000044', title: 'Task 44', start: 1627729997, end: 1628421197 },
  ];

  @HostBinding('class.gantt-example-component') class = true;
  @ViewChild('gantt') ganttComponent!: NgxGanttComponent;

  dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
    return true;
  };

  constructor(
    private printService: GanttPrintService,
  ) {
  }

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

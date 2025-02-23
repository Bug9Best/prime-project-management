import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { TableModule } from 'primeng/table';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { Mode } from '../../workspace/workspace-content-project/workspace-content-project.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'project-task',
  imports: [
    CommonModule,
    AppHeader,
    AppFilter,
    AppDialog,
    ButtonModule,
    TableModule
  ],
  templateUrl: './project-task.component.html',
  styleUrl: './project-task.component.scss'
})
export class ProjectTask {

  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  sortValue = 'NONE';

  title: string = 'project.title.task';
  subtitle: string = 'project.subtitle.task';

  selectedResource?: any;
  listResource: any[] = [];
  tempListResource: any[] = [];

  customers: any[] = [
    {
      "id": 1,
      "task_name": "​",
      "assignee": "Eartha Langabeer",
      "estimate_time": "8/2/2024",
      "actual_time": "10/29/2024"
    }, {
      "id": 2,
      "task_name": "​",
      "assignee": "Melodee O'Scannill",
      "estimate_time": "9/25/2024",
      "actual_time": "11/24/2024"
    }, {
      "id": 3,
      "task_name": "'\"'",
      "assignee": "Mireille Shegog",
      "estimate_time": "10/6/2024",
      "actual_time": "1/2/2025"
    }, {
      "id": 4,
      "task_name": "'\"'",
      "assignee": "Xever Siddele",
      "estimate_time": "11/23/2024",
      "actual_time": "1/24/2025"
    }, {
      "id": 5,
      "task_name": "-1E2",
      "assignee": "Lina Jopp",
      "estimate_time": "3/3/2024",
      "actual_time": "12/4/2024"
    }, {
      "id": 6,
      "task_name": "Ω≈ç√∫˜µ≤≥÷",
      "assignee": "Parke Barstow",
      "estimate_time": "1/19/2025",
      "actual_time": "12/14/2024"
    }, {
      "id": 7,
      "task_name": "<script>alert('hi')</script>",
      "assignee": "Salim Nation",
      "estimate_time": "9/9/2024",
      "actual_time": "4/9/2024"
    }, {
      "id": 8,
      "task_name": "!@#$%^&*()",
      "assignee": "Curry Postans",
      "estimate_time": "4/30/2024",
      "actual_time": "8/13/2024"
    }, {
      "id": 9,
      "task_name": "(╯°□°）╯︵ ┻━┻)  ",
      "assignee": "Culley Aneley",
      "estimate_time": "3/26/2024",
      "actual_time": "3/3/2024"
    }, {
      "id": 10,
      "task_name": "사회과학원 어학연구소",
      "assignee": "Bearnard Breffit",
      "estimate_time": "2/9/2025",
      "actual_time": "4/16/2024"
    }, {
      "id": 11,
      "task_name": "\"'\"'\"''''\"",
      "assignee": "Dew Widdowfield",
      "estimate_time": "1/2/2025",
      "actual_time": "4/17/2024"
    }, {
      "id": 12,
      "task_name": "　",
      "assignee": "Weylin Puddephatt",
      "estimate_time": "11/2/2024",
      "actual_time": "3/30/2024"
    }, {
      "id": 13,
      "task_name": "../../../../../../../../../../../etc/hosts",
      "assignee": "Magdalene Rontree",
      "estimate_time": "10/27/2024",
      "actual_time": "7/8/2024"
    }, {
      "id": 14,
      "task_name": "''",
      "assignee": "Luci Doyley",
      "estimate_time": "1/7/2025",
      "actual_time": "10/9/2024"
    }, {
      "id": 15,
      "task_name": "$1.00",
      "assignee": "Giffer Swettenham",
      "estimate_time": "6/6/2024",
      "actual_time": "11/15/2024"
    }, {
      "id": 16,
      "task_name": "(ﾉಥ益ಥ）ﾉ﻿ ┻━┻",
      "assignee": "Willyt Brumwell",
      "estimate_time": "2/29/2024",
      "actual_time": "9/9/2024"
    }, {
      "id": 17,
      "task_name": "1E2",
      "assignee": "Betteanne Petrie",
      "estimate_time": "11/9/2024",
      "actual_time": "6/16/2024"
    }, {
      "id": 18,
      "task_name": "'",
      "assignee": "Siouxie Baudins",
      "estimate_time": "4/14/2024",
      "actual_time": "9/21/2024"
    }, {
      "id": 19,
      "task_name": "⁰⁴⁵",
      "assignee": "Dieter Caccavari",
      "estimate_time": "12/28/2024",
      "actual_time": "11/8/2024"
    }, {
      "id": 20,
      "task_name": "⁰⁴⁵",
      "assignee": "Taber Pelfer",
      "estimate_time": "3/25/2024",
      "actual_time": "4/19/2024"
    }, {
      "id": 21,
      "task_name": "nil",
      "assignee": "Mikkel Garrett",
      "estimate_time": "1/18/2025",
      "actual_time": "4/13/2024"
    }, {
      "id": 22,
      "task_name": "nil",
      "assignee": "Galen Lambregts",
      "estimate_time": "1/8/2025",
      "actual_time": "4/14/2024"
    }, {
      "id": 23,
      "task_name": "__ﾛ(,_,*)",
      "assignee": "Vaughan Amsden",
      "estimate_time": "9/1/2024",
      "actual_time": "9/6/2024"
    }, {
      "id": 24,
      "task_name": "Ω≈ç√∫˜µ≤≥÷",
      "assignee": "Sibyl Allin",
      "estimate_time": "2/27/2024",
      "actual_time": "8/11/2024"
    }, {
      "id": 25,
      "task_name": "¸˛Ç◊ı˜Â¯˘¿",
      "assignee": "Corrinne Giffin",
      "estimate_time": "11/28/2024",
      "actual_time": "7/4/2024"
    }, {
      "id": 26,
      "task_name": "1/2",
      "assignee": "Gavrielle de Clerc",
      "estimate_time": "7/19/2024",
      "actual_time": "6/30/2024"
    }, {
      "id": 27,
      "task_name": "１２３",
      "assignee": "Theresita Cattell",
      "estimate_time": "10/20/2024",
      "actual_time": "10/24/2024"
    }, {
      "id": 28,
      "task_name": "1E2",
      "assignee": "Ronnie Koch",
      "estimate_time": "1/28/2025",
      "actual_time": "3/27/2024"
    }, {
      "id": 29,
      "task_name": "-$1.00",
      "assignee": "Alexandros Woodruff",
      "estimate_time": "9/12/2024",
      "actual_time": "2/21/2024"
    }, {
      "id": 30,
      "task_name": "task_name",
      "assignee": "Gregg MacDavitt",
      "estimate_time": "12/16/2024",
      "actual_time": "9/4/2024"
    }
  ]

  onSearch(event: any): void {

  }

  setSortValue(event: any): void {

  }

  onValidateForm() {
  }

}

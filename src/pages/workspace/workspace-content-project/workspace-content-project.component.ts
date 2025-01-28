import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AccordionModule } from 'primeng/accordion';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';

export type Mode = 'NONE' | 'GROUP';

@Component({
  selector: 'workspace-content-project',
  imports: [
    CommonModule,
    FormsModule,
    AppHeader,
    AppFilter,
    AppScrolling,
    ButtonModule,
    AccordionModule
  ],
  templateUrl: './workspace-content-project.component.html',
  styleUrl: './workspace-content-project.component.scss'
})
export class WorkspaceContentProject {

  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  title = 'WORKSPACE_MENU_PROJECT_TITLE';
  subtitle = 'WORKSPACE_MENU_PROJECT_SUBTITLE';

  sortValue = 'NONE';
  groupValue = 'NONE';

  listProject: any[] = []
  templistProject: any[] = [];
  grouplistProject: { [key: string]: any[] } = {};

  ngOnInit() {
    this.listProject = [
      {
        id: 1,
        project_name: "Y-find",
        project_type: "Scrum Project",
        created_at: "10/1/2024"
      },
      {
        id: 2,
        project_name: "Konklux",
        project_type: "Scrum Project",
        created_at: "1/29/2024"
      },
      {
        id: 3,
        project_name: "Opela",
        project_type: "Kanban Project",
        created_at: "11/2/2024"
      },
      {
        id: 4,
        project_name: "Bamity",
        project_type: "Waterfall Project",
        created_at: "9/29/2024"
      },
      {
        id: 5,
        project_name: "Alphazap",
        project_type: "Scrum Project",
        created_at: "6/1/2024"
      },
      {
        id: 6,
        project_name: "Tampflex",
        project_type: "Waterfall Project",
        created_at: "1/15/2025"
      },
      {
        id: 7,
        project_name: "Zamit",
        project_type: "Kanban Project",
        created_at: "9/5/2024"
      },
      {
        id: 8,
        project_name: "Tampflex",
        project_type: "Kanban Project",
        created_at: "7/24/2024"
      },
      {
        id: 9,
        project_name: "Zontrax",
        project_type: "Scrum Project",
        created_at: "11/29/2024"
      },
      {
        id: 10,
        project_name: "Y-Solowarm",
        project_type: "Scrum Project",
        created_at: "8/21/2024"
      },
      {
        id: 11,
        project_name: "Duobam",
        project_type: "Waterfall Project",
        created_at: "8/31/2024"
      },
      {
        id: 12,
        project_name: "Wrapsafe",
        project_type: "Kanban Project",
        created_at: "2/27/2024"
      },
      {
        id: 13,
        project_name: "Pannier",
        project_type: "Waterfall Project",
        created_at: "8/24/2024"
      },
      {
        id: 14,
        project_name: "Veribet",
        project_type: "Kanban Project",
        created_at: "10/19/2024"
      },
      {
        id: 15,
        project_name: "Lotstring",
        project_type: "Waterfall Project",
        created_at: "7/7/2024"
      },
    ]
    this.templistProject = [...this.listProject];
  }

  onSearch(event: any) {
    if (!event || event.trim() === '') {
      this.isOnSearch = false;
      this.listProject = [...this.templistProject];
      if (this.mode === 'GROUP') {
        this.grouplistProject = this.groupByType(this.templistProject);
      }
      return;
    }

    const searchTerm = event.toLowerCase().trim();
    this.isOnSearch = true;

    if (this.mode === 'GROUP') {
      const filteredList = this.templistProject.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm) ||
        item.project_type.toLowerCase().includes(searchTerm)
      );
      this.grouplistProject = this.groupByType(filteredList);
    } else {
      this.listProject = this.templistProject.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm) ||
        item.project_type.toLowerCase().includes(searchTerm)
      );
    }
  }

  setGroupValue(event: any) {
    this.groupValue = event.value;
    switch (this.groupValue) {
      case 'NONE':
        this.mode = 'NONE';
        this.listProject = this.isOnSearch ? this.listProject : this.templistProject;
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      case 'TYPE':
        this.mode = 'GROUP';
        this.grouplistProject = this.groupByType(this.isOnSearch ? this.listProject : this.templistProject);
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      default:
        break;
    }
  }

  groupByType(items: any[]): { [key: string]: any[] } {
    return items.reduce((acc, item) => {
      const typeKey = item.project_type.split(' ')[0];
      acc[typeKey] = acc[typeKey] || [];
      acc[typeKey].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  setSortValue(event: { value: string }): void {
    this.sortValue = event.value;

    const sortBy: Record<string, (a: any, b: any) => number> = {
      'NAME_ASC': (a, b) => a.project_name.localeCompare(b.project_name),
      'NAME_DESC': (a, b) => b.project_name.localeCompare(a.project_name),
      'TYPE_ASC': (a, b) => a.project_type.localeCompare(b.project_type),
      'TYPE_DESC': (a, b) => b.project_type.localeCompare(a.project_type),
      'DATE_ASC': (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      'DATE_DESC': (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    };

    const sortFunction = sortBy[this.sortValue];
    const defaultSort = (a: any, b: any) => a.id - b.id;

    if (this.sortValue === 'NONE') {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistProject).forEach(key => {
          this.grouplistProject[key]?.sort(defaultSort);
        });
      } else {
        this.listProject.sort(defaultSort);
      }
    } else if (sortFunction) {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistProject).forEach(key => {
          this.grouplistProject[key]?.sort(sortFunction);
        });
      }
      this.listProject.sort(sortFunction);
    }
  }
}

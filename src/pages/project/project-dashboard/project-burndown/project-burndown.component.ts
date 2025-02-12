import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'project-burndown',
  imports: [
    FormsModule,
    TranslateModule,
    DividerModule,
    SelectModule,
    ChartModule
  ],
  templateUrl: './project-burndown.component.html',
  styleUrl: './project-burndown.component.scss'
})
export class ProjectBurndown {

  chartData: any;
  chartOptions: any;
  selectedType = 'burndown';
  burnType: any[] = [
    { name: 'Burn Up', code: 'burnup' },
    { name: 'Burn Down', code: 'burndown' },
  ];

  constructor() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'First Dataset',
          data: [89, 74, 68, 55, 42, 37, 25, 22, 18, 11, 8, 0],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-blue-500'),
          tension: 0.2
        },
      ]
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
        display: false,
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  onSelectedTypeEvent = output<any>();
  onSelectedType() {
    this.onSelectedTypeEvent.emit(this.selectedType);
  }
}

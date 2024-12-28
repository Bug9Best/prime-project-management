import { signal } from '@angular/core';
import { GANTT_GLOBAL_CONFIG } from '@worktile/gantt';
import { da, enUS, th } from 'date-fns/locale';

export class GanttConfig {
  private _dateOptions = signal({
    locale: enUS
  });

  private _dateFormat = signal({
    hour: 'HH:mm',
    day: 'dd/MM/yyyy',
    week: `'week' w 'of' yyyy`,
    month: 'LLLL',
    year: `'year' yyyy`,
    yearMonth: `LLLL yyyy' (week' w ')'`,
    yearQuarter: `QQQQ 'of' yyyy`,
  });

  public get dateOptions() {
    return this._dateOptions();
  }

  public set dateOptions(value) {
    this._dateOptions.set(value);
  }

  public get dateFormat() {
    return this._dateFormat();
  }

  public set dateFormat(value) {
    console.log(value);
    this._dateFormat.set(value);
  }
}

export const GanttConfigProvider = {
  provide: GANTT_GLOBAL_CONFIG,
  useFactory: () => {
    const ganttConfig = new GanttConfig();
    return {
      dateOptions: ganttConfig.dateOptions,
      dateFormat: ganttConfig.dateFormat,
    };
  }
};



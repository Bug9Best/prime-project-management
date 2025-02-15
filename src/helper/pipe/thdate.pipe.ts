import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thdate"
})
export class ThaiDatePipe implements PipeTransform {
  inputDate: Date = new Date();
  format?: string;
  options?: string;

  transform(date?: any, format?: any, options?: any): string | null {
    if (!date) return null;
    try {
      if (typeof (date) == "string") {
        this.inputDate = new Date(date);
      } else if (date instanceof Date) {
        this.inputDate = date;
      }

      this.format = format;
      this.options = options;

      let result = "";
      switch (format) {
        case "time":
          result = this.time();
          break;

        case "medium":
          result = this.medium();
          break;

        case "long":
          result = this.long();
          break;

        case "dateTime":
          result = this.dateTime();
          break;

        case "relative":
          result = this.relative();
          break;

        default:
          result = this.relative();
      }
      return result;
    } catch {
      return date;
    }
  }

  dateTime(): string {
    return this.medium() + " " + this.time();
  }

  time(): string {
    let hours = this.inputDate.getHours().toString().padStart(2, "0");
    let minutes = this.inputDate.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes} น.`;
  }

  long(): string {
    return new Intl.DateTimeFormat("th-TH", { dateStyle: "long" }).format(this.inputDate);
  }

  medium(): string {
    return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(this.inputDate);
  }

  relative(): string {
    let result = this.relativeMonths();
    let diffSeconds = Math.abs((this.inputDate.getTime() - new Date().getTime()) / 1000);

    if (diffSeconds < 60) {
      result = this.relativeSeconds();
    }
    else if (diffSeconds < 3600) {
      result = this.relativeMinutes();
    }
    else if (diffSeconds < 3600 * 24) {
      result = this.relativeHours();
    }
    else if (diffSeconds < 3600 * 24 * 7) {
      result = this.relativeDays();
    }
    else if (diffSeconds < 3600 * 24 * 30) {
      result = this.relativeMonths();
    }

    return result;
  }

  relativeSeconds(): string {
    let diffSeconds = Math.round((this.inputDate.getTime() - new Date().getTime()) / 1000);
    return new Intl.RelativeTimeFormat("th-TH", { style: "narrow", numeric: "auto" })
      .format(diffSeconds, 'seconds');
  }

  relativeMinutes(): string {
    let diffSeconds = (this.inputDate.getTime() - new Date().getTime()) / 1000;
    let diffMinutes = Math.round(diffSeconds / 60);
    return new Intl.RelativeTimeFormat("th-TH", { style: "narrow", numeric: "auto" })
      .format(diffMinutes, "minutes");
  }

  relativeHours(): string {
    let diffSeconds = (this.inputDate.getTime() - new Date().getTime()) / 1000;
    let diffMinutes = Math.round(diffSeconds / 60);
    let diffHours = Math.round(diffMinutes / 60);
    return new Intl.RelativeTimeFormat("th-TH", { style: "narrow", numeric: "auto" })
      .format(diffHours, "hours");
  }

  relativeDays(): string {
    let diffSeconds = (this.inputDate.getTime() - new Date().getTime()) / 1000;
    let diffMinutes = Math.round(diffSeconds / 60);
    let diffHours = Math.round(diffMinutes / 60);
    let diffDays = Math.round(diffHours / 24)
    return new Intl.RelativeTimeFormat("th-TH", { style: "narrow", numeric: "auto" })
      .format(diffDays, "days");
  }

  relativeMonths(): string {
    let diffYears = this.inputDate.getFullYear() - new Date().getFullYear();
    let currentMonth = this.inputDate.getMonth() + (diffYears * 12);
    let diffMonths = currentMonth - new Date().getMonth();

    return new Intl.RelativeTimeFormat("th-TH", { style: "narrow", numeric: "auto" })
      .format(diffMonths, "months");
  }
}

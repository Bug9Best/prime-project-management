import { Directive, Input } from '@angular/core';
import { TranslationKeys } from 'primeng/api';
import { Calendar } from 'primeng/calendar';

@Directive({
  standalone: true,
  selector: 'p-calendar[showBuddhistCalendar]',
})
export class ChaosThaiCalendarDirective {
  @Input() showBuddhistCalendar: boolean = false;

  constructor(private calendar: Calendar) {
    calendar.formatDate = (date, format) => this.formatDate(date, format);
    calendar.parseDate = (value, format) => this.parseDate(value, format);
  }

  formatDate(date: any, format: any) {
    if (!date) {
      return '';
    }

    let iFormat!: any;
    const lookAhead = (match: string) => {
        const matches =
          iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      },
      formatNumber = (match: string, value: any, len: any) => {
        let num = '' + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }
        return num;
      },
      formatName = (
        match: string,
        value: any,
        shortNames: any,
        longNames: any
      ) => {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
    let output = '';
    let literal = false;

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date.getDate(), 2);
              break;
            case 'D':
              output += formatName(
                'D',
                date.getDay(),
                this.calendar.getTranslation(TranslationKeys.DAY_NAMES_SHORT),
                this.calendar.getTranslation(TranslationKeys.DAY_NAMES)
              );
              break;
            case 'o':
              output += formatNumber(
                'o',
                Math.round(
                  (new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                  ).getTime() -
                    new Date(date.getFullYear(), 0, 0).getTime()) /
                    86400000
                ),
                3
              );
              break;
            case 'm':
              output += formatNumber('m', date.getMonth() + 1, 2);
              break;
            case 'M':
              output += formatName(
                'M',
                date.getMonth(),
                this.calendar.getTranslation(TranslationKeys.MONTH_NAMES_SHORT),
                this.calendar.getTranslation(TranslationKeys.MONTH_NAMES)
              );
              break;
            case 'y':
              output += lookAhead('y')
                ? date.getFullYear()
                : (date.getFullYear() % 100 < 10 ? '0' : '') +
                  (date.getFullYear() % 100);
              break;
            case 'B':
              let year = date.getFullYear() + 543;
              output += lookAhead('B') ? year : (year % 100 < 10 ? '0' : '') + (year % 100);
              break;
            case '@':
              output += date.getTime();
              break;
            case '!':
              output +=
                date.getTime() * 10000 + <number>this.calendar.ticksTo1970;
              break;
            case "'":
              if (lookAhead("'")) {
                output += "'";
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
          }
        }
      }
    }
    return output;
  }

  // Ported from jquery-ui datepicker parseDate
  parseDate(value: any, format: any) {
    if (format == null || value == null) {
      throw 'Invalid arguments';
    }

    value = typeof value === 'object' ? value.toString() : value + '';
    if (value === '') {
      return null;
    }

    let iFormat!: any,
      dim,
      extra,
      iValue = 0,
      shortYearCutoff =
        typeof this.calendar.shortYearCutoff !== 'string'
          ? this.calendar.shortYearCutoff
          : (new Date().getFullYear() % 100) +
            parseInt(this.calendar.shortYearCutoff, 10),
      year = -1,
      month = -1,
      day = -1,
      doy = -1,
      literal = false,
      date,
      lookAhead = (match: any) => {
        let matches =
          iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      },
      getNumber = (match: any) => {
        let isDoubled = lookAhead(match),
          size =
            match === 'B'
              ? 4
              : match === '@'
              ? 14
              : match === '!'
              ? 20
              : match === 'y' && isDoubled
              ? 4
              : match === 'o'
              ? 3
              : 2,
          minSize = match === 'y' ? size : 1,
          digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
          num = value.substring(iValue).match(digits);
        if (!num) {
          throw 'Missing number at position ' + iValue;
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      },
      getName = (match: any, shortNames: any, longNames: any) => {
        let index = -1;
        let arr = lookAhead(match) ? longNames : shortNames;
        let names = [];

        for (let i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort((a, b) => {
          return -(a[1].length - b[1].length);
        });

        for (let i = 0; i < names.length; i++) {
          let name = names[i][1];
          if (
            value.substr(iValue, name.length).toLowerCase() ===
            name.toLowerCase()
          ) {
            index = names[i][0];
            iValue += name.length;
            break;
          }
        }

        if (index !== -1) {
          return index + 1;
        } else {
          throw 'Unknown name at position ' + iValue;
        }
      },
      checkLiteral = () => {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw 'Unexpected literal at position ' + iValue;
        }
        iValue++;
      };

    if (this.calendar.view === 'month') {
      day = 1;
    }

    for (iFormat = 0; iFormat < format.length; iFormat++) {
      if (literal) {
        if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
          literal = false;
        } else {
          checkLiteral();
        }
      } else {
        switch (format.charAt(iFormat)) {
          case 'd':
            day = getNumber('d');
            break;
          case 'D':
            getName(
              'D',
              this.calendar.getTranslation(TranslationKeys.DAY_NAMES_SHORT),
              this.calendar.getTranslation(TranslationKeys.DAY_NAMES)
            );
            break;
          case 'o':
            doy = getNumber('o');
            break;
          case 'm':
            month = getNumber('m');
            break;
          case 'M':
            month = getName(
              'M',
              this.calendar.getTranslation(TranslationKeys.MONTH_NAMES_SHORT),
              this.calendar.getTranslation(TranslationKeys.MONTH_NAMES)
            );
            break;
          case 'B':
            year = getNumber('B');
            if (year < 100) {
              let buddhistYear = new Date().getFullYear() + 543;
              year += buddhistYear - (buddhistYear % 100);
            }
            year -= 543;
            break;
          case 'y':
            year = getNumber('y');
            break;
          case '@':
            date = new Date(getNumber('@'));
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case '!':
            date = new Date(
              (getNumber('!') - <number>this.calendar.ticksTo1970) / 10000
            );
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case "'":
            if (lookAhead("'")) {
              checkLiteral();
            } else {
              literal = true;
            }
            break;
          default:
            checkLiteral();
        }
      }
    }
    
    if (iValue < value.length) {
      extra = value.substr(iValue);
      if (!/^\s+/.test(extra)) {
        throw 'Extra/unparsed characters found in date: ' + extra;
      }
    }

    if (year === -1) {
      year = new Date().getFullYear();
    } else if (year < 100) {
      year +=
        new Date().getFullYear() -
        (new Date().getFullYear() % 100) +
        (year <= shortYearCutoff ? 0 : -100);
    }

    if (doy > -1) {
      month = 1;
      day = doy;
      do {
        dim = this.calendar.getDaysCountInMonth(year, month - 1);
        if (day <= dim) {
          break;
        }
        month++;
        day -= dim;
      } while (true);
    }

    if (this.calendar.view === 'year') {
      month = month === -1 ? 1 : month;
      day = day === -1 ? 1 : day;
    }

    date = this.calendar.daylightSavingAdjust(new Date(year, month - 1, day));

    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      throw 'Invalid date'; // E.g. 31/02/00
    }

    return date;
  }
}

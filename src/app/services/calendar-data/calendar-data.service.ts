import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CalendarData } from '../../interfaces/calendar-data';

@Injectable()
export class CalendarDataService {
  getCalendarData(startDate: string, numberOfDays: number, holidays: any): CalendarData[] {
    const calendarData = [];

    if (startDate && numberOfDays) {
      let momentStartDate = moment(startDate);
      const startDateMonthHolidays = this.getMonthHolidays(holidays, momentStartDate);
      const startDateNumber = momentStartDate.date();
      const daysFromStartDateCount = startDateNumber + numberOfDays;
      const dateRangeEndsAfterFirstCalendarItem = momentStartDate.daysInMonth() < daysFromStartDateCount;
      const startDateOfFirstCalendarItem =  startDateNumber > 1 ? startDateNumber : null;

      const momentEndDate = moment(startDate).add(numberOfDays, 'days').subtract({ hours: 1 });
      const endDateNumber = momentEndDate.date();
      const endDateOfFirstCalendarItem = dateRangeEndsAfterFirstCalendarItem ? null : endDateNumber;
      const firstCalendarItemData =
        this.getCalendarItemData(momentStartDate, startDateOfFirstCalendarItem, endDateOfFirstCalendarItem, true, startDateMonthHolidays);

      calendarData.push(firstCalendarItemData);

      if (dateRangeEndsAfterFirstCalendarItem) {
        const endDateMonthAndYear = momentEndDate.format('MM-YYYY');

        while (momentStartDate.format('MM-YYYY') !== endDateMonthAndYear) {
          momentStartDate = momentStartDate.add(1, 'month');
          const currentDateMonthHolidays = this.getMonthHolidays(holidays, momentStartDate);
          const currentItemMonthAndYear = momentStartDate.format('MM-YYYY');
          const calendarItemsEndInCurrentOne = currentItemMonthAndYear === endDateMonthAndYear;
          const newCalendarItemEndsIn = calendarItemsEndInCurrentOne ? endDateNumber : null;
          const newCalendarItem = this.getCalendarItemData(momentStartDate, null, newCalendarItemEndsIn, true, currentDateMonthHolidays);

          calendarData.push(newCalendarItem);
        }
      }
    }

    return calendarData;
  }

  getCalendarItemData(momentDate, startFrom: number, endIn: number, showDays: boolean, holidays: any): CalendarData {
    const year = momentDate.year();
    const month = momentDate.format('MMMM');
    const daysAmount = momentDate.daysInMonth();
    const monthStartDay = momentDate.startOf('month').day();

    return {
      showDays,
      year,
      month,
      daysAmount,
      monthStartDay,
      startFrom,
      endIn,
      holidays
    };
  }

  getMonthHolidays(allHolidays, currentDate) {
    const parsedHolidays = [];

    Object.keys(allHolidays).forEach((value) => {
      if (moment(value).month() === currentDate.month()) {
        parsedHolidays.push(moment(value).date());
      }
    });

    return parsedHolidays;
  }
}

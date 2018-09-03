import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime, mergeMap, map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

import { CalendarDataService } from './services/calendar-data/calendar-data.service';
import { HolidayApiService } from '../app/services/holiday-api/holiday-api.service';

import { CalendarData } from './interfaces/calendar-data';

import { COUNTRY_CODES } from './data/country-codes';

const YEAR_FOR_HOLIDAY_API_CALLS = '2017';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendarsDataForm: FormGroup;
  calendarData: CalendarData[] = [];

  constructor(private formBuilder: FormBuilder,
              private calendarDataService: CalendarDataService,
              private holidayApiService: HolidayApiService) {
    this.calendarsDataForm = formBuilder.group({
      startDate: null,
      numberOfDays: null,
      countryCode: null
    });
  }

  get showCountryCodeText() {
    const countryCodeValue = this.calendarsDataForm.get('countryCode').value;
    return countryCodeValue === '' || !countryCodeValue;
  }

  get showDateText() {
    return !this.calendarsDataForm.get('startDate').value;
  }

  get showNumberOfDaysText() {
    return !this.calendarsDataForm.get('numberOfDays').value;
  }

  ngOnInit() {
    this.calendarsDataForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap((formValues) => {
          return this.addHolidaysToFormStream(formValues);
        })
      )
      .subscribe((calendarData) => {
        const { formData, holidayData } = <any>calendarData;
        const { startDate, numberOfDays } = formData;

        this.calendarData = this.calendarDataService.getCalendarData(startDate, numberOfDays, holidayData.holidays);
      });
  }

  addHolidaysToFormStream(formData): any {
    const { countryCode } = formData;
    const responseWithoutHolidays = {
      formData,
      holidayData: {
        holidays: {}
      }
    };
    const formattedCountryCode = countryCode ? countryCode.toUpperCase() : '';

    if (COUNTRY_CODES[formattedCountryCode]) {
      return this.holidayApiService.getCountryHolidays(formattedCountryCode, YEAR_FOR_HOLIDAY_API_CALLS).pipe(
        map((holidayData) => {
          return {
            formData,
            holidayData
          };
        })
      );
    }

    return observableOf(responseWithoutHolidays);
  }
}

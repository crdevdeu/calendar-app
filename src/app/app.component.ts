import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { CalendarDataService } from './services/calendar-data/calendar-data.service';
import { CalendarData } from './interfaces/calendar-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendarsDataForm: FormGroup;
  calendarData: CalendarData[] = [];

  constructor(private formBuilder: FormBuilder, private calendarDataService: CalendarDataService) {
    this.calendarsDataForm = formBuilder.group({
      startDate: null,
      numberOfDays: null,
      countryCode: null
    });
  }

  ngOnInit() {
    this.calendarsDataForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((formValues) => {
        const { startDate, countryCode, numberOfDays } = formValues;

        this.calendarData = this.calendarDataService.getCalendarData(startDate, numberOfDays);
      });
  }
}

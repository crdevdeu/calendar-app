import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarModule } from './components/calendar/calendar.component';

import { CalendarDataService } from './services/calendar-data/calendar-data.service';
import { HolidayApiService } from '../app/services/holiday-api/holiday-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CalendarDataService,
    HolidayApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

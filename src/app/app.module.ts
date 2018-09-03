import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarModule } from './components/calendar/calendar.component';

import { CalendarDataService } from './services/calendar-data/calendar-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  providers: [CalendarDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

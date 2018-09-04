# CalendarApp

Web app to display range of days with holidays in calendar widgets.

## Features

The main purpose of the app is to allow the user to visualize in calendar widgets a range of days starting from the value set in the "Start Date" input and ending in the resulting date of adding the "Number of days" input value to the Start Date. Holidays can be visualized by entering the ISO country code in the "Country Code" field.

## Architecture

The app is a SPA built with Angular 6, it has a main component that relies services and a presentational component called "CalendarComponent" to render the calendar widgets.

### Services

- CalendarDataService: used to generate the data that is used to render the caldendar widgets based on the user selected input values for Start Date, number of days and Country Code.
- HolidayApiService: used to connect to the holidayapi.com holidays API.

### Presentational components
- CalendarComponent: presentational component to render a calendar widget, this component can be used as a stand alone component that relies only in its inputs. The values passed as inputs to this component are constrained by a regular calendar rules e.g -@Input daysAmount- should not be greater that 31, -@Input month- should be a valid month number, etc.

## Environment settings

The holidayapi.com API key and url can be set in the environments files for development and production.

## Running the app 

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Demo

A live version of the app can be accesed navigating to `http://localhost:4200/`

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class HolidayApiService {
  constructor(private http: HttpClient) { }

  getCountryHolidays(country: string, year: string) {
    const { url, key } = environment.holidayAPI;
    const options = {
      params: {
        key,
        country,
        year
      }
    };

    return this.http.get(url, options);
  }
}

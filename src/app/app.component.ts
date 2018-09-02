import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  daysAmount = 31;
  monthStartDay = 7;
  startFrom = 12;
  calendarsDataForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
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
        console.log(formValues);
      });
  }
}

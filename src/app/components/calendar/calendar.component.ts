import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() showDays: boolean;
  @Input() year: string;
  @Input() month: string;
  @Input() daysAmount: number;
  @Input() monthStartDay: number;
  @Input() startFrom: number;
  @Input() endIn: number;
  @Input() holidays: any;
  dataset = [];

  get upperCaseMonth() {
    return this.month.toUpperCase();
  }

  ngOnInit() {
    for (let i = 1; i < this.monthStartDay; i++ ) {
      this.dataset.push({ value: '', isValid: false });
    }

    for (let j = 1; j <= this.daysAmount; j++ ) {
      const dateValueIsBeforeStart = this.startFrom && (j < this.startFrom);
      const dateValueIsAfterEnd = this.endIn && (j > this.endIn);

      if (dateValueIsBeforeStart || dateValueIsAfterEnd) {
        this.dataset.push({ value: '', isValid: false });
      } else {
        const isHoliday = this.holidays.indexOf(j) > -1;
        this.dataset.push({ value: j, isValid: true, isHoliday });
      }
    }

    this.completedataset();
  }

  completedataset(): void {
    if (this.dataset.length % 7 !== 0) {
      this.dataset.push({ value: '', isValid: false });

      this.completedataset();
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule { }

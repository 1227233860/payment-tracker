import { Component, OnInit } from '@angular/core';

export interface Data {
  date?: string;
  benificiaryName?: string;
  status?: string;
  amount?: string;
}

export interface Sort {
  fieldName?: string;
  type?: number;
}

export const dataSource = [{
  date: '2020-7-12',
  benificiaryName: 'Tom',
  status: 'Completed',
  amount: '1,000.00'
}, {
  date: '2020-9-20',
  benificiaryName: 'Amy',
  status: 'In progress',
  amount: '940.00'
}, {
  date: '2020-6-24',
  benificiaryName: 'Grace',
  status: 'Rejected',
  amount: '400.00'
}, {
  date: '2020-11-11',
  benificiaryName: 'Alex',
  status: 'Completed',
  amount: '1,200.00'
}];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  datas: Array<Data> = [];

  sortStrategy: Sort = {
    fieldName: '',
    type: undefined
  };

  sortTypes = [-1, 1];

  ngOnInit(): void {
    this.datas = [...dataSource];
    this.sort('date', -1);
  }

  getNextType(type = 0): void {
    const currentIndex = this.sortTypes.indexOf(type);
    const nextIndex = currentIndex === this.sortTypes.length - 1 ? 0 : currentIndex + 1;
    this.sortStrategy.type = this.sortTypes[nextIndex];
  }

  sort(field: string, type = -1): void {
    if (field === this.sortStrategy.fieldName) {
      this.getNextType(this.sortStrategy.type);
    } else {
      this.sortStrategy = {
        fieldName: field,
        type: -1
      }
    }
    type = this.sortStrategy.type || -1;
    this.datas = this.datas.sort((previous: any, next: any) => {
      if (Number.isNaN(Number(Date.parse(previous[field])))) {
        // string compare
        if (
          (previous[field].toLowerCase() > next[field].toLowerCase() && type > 0)
          || (previous[field].toLowerCase() < next[field].toLowerCase() && type < 0)
        ) {
          return 1;
        } else {
          return -1;
        }
      }
      // date compare
      if (
        (Date.parse(previous[field]) > Date.parse(next[field]) && type > 0)
        || (Date.parse(previous[field]) < Date.parse(next[field]) && type < 0)
      ) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

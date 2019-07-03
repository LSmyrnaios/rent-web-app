import { Component, OnInit } from '@angular/core';
import { sortOption } from '../../../../../shared/models/sortOption';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  options: sortOption[];

  selected: string;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.options = [
      {
        id: 'stars',
        name: 'Αστέρια'
      },
      {
        id: 'numberOfRooms',
        name: 'Με αριθμό δωματίων'
      }
    ];
  }

  filter(key) {
    this.router.navigate(['/search'],
      {
        queryParams: {
          sort_field: key
        },
        queryParamsHandling: 'merge'
      });
  }

  sortResults($event: MouseEvent, option: string) {
    console.log($event, option);
    this.selected = option;
    this.filter(option);
  }
}

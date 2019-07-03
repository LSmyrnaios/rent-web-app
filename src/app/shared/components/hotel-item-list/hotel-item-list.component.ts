import { Component, Input, OnInit } from '@angular/core';
import { PagedResponse } from '../../models/payload/PagedResponse';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-hotel-item-list',
  templateUrl: './hotel-item-list.component.html',
  styleUrls: ['./hotel-item-list.component.scss']
})
export class HotelItemListComponent implements OnInit {

  @Input() hotelPagedResults: PagedResponse<Hotel>;

  constructor() {
  }

  ngOnInit() {
  }

}

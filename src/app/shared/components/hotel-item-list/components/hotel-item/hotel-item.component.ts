import { Component, Input, OnInit } from '@angular/core';
import {Hotel} from '../../../../models/hotel';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel;

  constructor() {
  }

  ngOnInit() {
  }
}

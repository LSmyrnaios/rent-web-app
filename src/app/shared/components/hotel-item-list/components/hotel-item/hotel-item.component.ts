import { Component, Input, OnInit } from '@angular/core';
import {Hotel} from '../../../../models/hotel';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel;
  photoUrl: string;

  constructor() {
  }

  ngOnInit() {
    if ( this.hotel.photosUrls == null || this.hotel.photosUrls.length === 0 ) {
      // This will cause the backend to send the default-hotel-image.
      this.photoUrl = environment.hotelsEndpoint + '/' + this.hotel.id + '/photos/1.jpg';
    } else {
      this.photoUrl = this.hotel.photosUrls[0];
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {HotelService} from '../../../shared/services/hotel.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { Hotel } from '../../../shared/models/hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  hotel: Hotel;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(response => {
      console.log(response.data);
      // TODO: Server should return not found if the hotel with the given id doesn't exist
      this.hotel = response.data[0].hotel;
      this.hotel.rooms = response.data[1].content;
      this.titleService.setTitle(this.hotel.name);
    });
  }

}

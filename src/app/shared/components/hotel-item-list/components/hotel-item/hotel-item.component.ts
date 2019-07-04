import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../../../../models/hotel';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel;
  photoUrl: string;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.hotel.photosUrls == null || this.hotel.photosUrls.length === 0) {
      // This will cause the backend to send the default-hotel-image.
      this.photoUrl = 'https://picsum.photos/id/' + (Math.floor(Math.random() * 500) + 1).toString() + '/200/200';
      //= environment.hotelsEndpoint + '/' + this.hotel.id + '/photos/1.jpg';
    } else {
      this.photoUrl = this.hotel.photosUrls[0];
    }
  }

  goToHotel(id: number) {
    this.router.navigate(['/hotels', id],
      { queryParamsHandling: 'preserve' });
  }
}

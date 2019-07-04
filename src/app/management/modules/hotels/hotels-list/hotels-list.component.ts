import { Component, OnInit } from '@angular/core';
import {Hotel} from '../../../../shared/models/hotel';
import {HotelService} from '../../../../shared/services/hotel.service';
import {AuthenticationService} from '../../../../shared/services/authentication.service';
import {User} from '../../../../shared/models/user';
import {Session} from '../../../../shared/models/session';
import {PagedResponse} from '../../../../shared/models/payload/PagedResponse';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent implements OnInit {

  constructor(
    private hotelService: HotelService,
    private auth: AuthenticationService
  ) {
  }

  provider: User;
  session: Session;
  hotelPagedResults: PagedResponse<Hotel>;


  ngOnInit() {
    this.auth.session$.subscribe( session => {
      this.session = session;
      this.provider = this.session.user;
      this.getHotelsByProvider();
    });
  }


  getHotelsByProvider() {
    this.hotelService.getHotelsByProvider(this.provider).subscribe((hotelPagedResults: PagedResponse<Hotel>) => {
      console.log('hotelPagedResults', hotelPagedResults);
      this.hotelPagedResults = hotelPagedResults;
      },
      error => {
        console.error('error', error);
      });
    }

}

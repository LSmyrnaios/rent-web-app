import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { HotelService } from '../../../shared/services/hotel.service';
import { RoomSearchRequest } from '../../../shared/models/payload/RoomSearchRequest';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class HotelResolver implements Resolve<Observable<any>> {

  roomSearchRequest: RoomSearchRequest;

  constructor(
    private hotelService: HotelService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    /* Initialize a class instance */
    this.roomSearchRequest = new RoomSearchRequest(moment(new Date()).format('YYYY-MM-DD'),
      moment(new Date()).add(2, 'days').format('YYYY-MM-DD'),
      2, 0, 1000);

    // tslint:disable-next-line:max-line-length
    /* Get the class members after initializing the instance (it is very important to initialize the instance, otherwise the instance will be empty). */
    const searchClassMembers = Object.getOwnPropertyNames(this.roomSearchRequest);
    route.queryParamMap.keys.forEach((key) => {
      /* Only add the query params to the filters that are members of the class. */
      if (searchClassMembers.includes(key)) {
        this.roomSearchRequest[key] = route.queryParamMap.get(key);
      }
    });

    console.log('RoomRequest', this.roomSearchRequest);

    const hotel = this.hotelService.getHotelDetails(route.paramMap.get('id'));
    const hotelRooms = this.hotelService.getHotelRooms(route.paramMap.get('id'), this.roomSearchRequest);
    return forkJoin([hotel, hotelRooms]);
  }
}

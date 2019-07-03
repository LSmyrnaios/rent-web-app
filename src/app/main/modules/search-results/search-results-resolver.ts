import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelService } from '../../../shared/services/hotel.service';
import { SearchRequest } from '../../../shared/models/payload/SearchRequest';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class SearchResultsResolver implements Resolve<Observable<any>> {

  searchRequest: SearchRequest;

  constructor(
    private hotelService: HotelService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    /* Initialize a class instance */
    this.searchRequest = new SearchRequest(37.983810, 23.727539, moment(new Date()).format('YYYY-MM-DD'),
      moment(new Date()).add(2, 'days').format('YYYY-MM-DD'),
      2, false, false, false, false, false,
      false, false, false, false, 0, 1000, 5, 'id', 'asc');

    // tslint:disable-next-line:max-line-length
    /* Get the class members after initializing the instance (it is very important to initialize the instance, otherwise the instance will be empty). */
    const searchClassMembers = Object.getOwnPropertyNames(this.searchRequest);
    route.queryParamMap.keys.forEach((key) => {
      /* Only add the query params to the filters that are members of the class. */
      if (searchClassMembers.includes(key)) {
        this.searchRequest[key] = route.queryParamMap.get(key);
      }
    });
    return this.hotelService.search(this.searchRequest);
  }
}

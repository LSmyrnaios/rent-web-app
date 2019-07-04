import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Hotel } from '../models/hotel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { SearchResults } from '../models/payload/SearchResults';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(
    private http: HttpClient
  ) {
  }


  getHotelDetails(hotelID): Observable<Hotel> {
    return this.http.get<Hotel>(environment.apiRoot + '/hotels/' + hotelID);
  }

  getHotelRooms(hotelID, filters): Observable<Hotel> {
    const params = new HttpParams({fromObject: filters});
    return this.http.get<Hotel>(`${environment.apiRoot + '/hotels/' + hotelID + '/rooms'}`, {params});
  }

  reserveRoom(hotelID: number, roomID: number, startDate: string, endDate: string) {
    const reservation = {
      startDate,
      endDate
    };
    console.log('You reserved room ' + roomID + ' of hotel ' + hotelID + ' from ' + startDate + ' to ' + endDate);
    return this.http.post<any>(`${environment.apiRoot + '/hotels/' + hotelID + '/rooms/' + roomID + '/reservation'}`, reservation);
  }

  search(filters) {
    const params = new HttpParams({fromObject: filters});
    return this.http.get<SearchResults>(`${environment.hotelsEndpoint + '/search'}`, {params}).pipe(
      map((searchResults: SearchResults) => {
        return {
          ...searchResults,
          results: {
            ...searchResults.results,
            content: searchResults.results.content.map((hotel: Hotel) => {
              return {
                ...hotel,
                createdAt: moment(new Date(hotel.createdAt)).format('DD-MM-YYYY - HH:mm'),
                updatedAt: moment(new Date(hotel.updatedAt)).format('DD-MM-YYYY - HH:mm'),
                address: ''
              };
            })
          }
        };
      }),
    );
  }
}

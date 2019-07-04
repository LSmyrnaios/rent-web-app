import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../../environments/environment';
import {Business} from '../models/business';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient
  ) {
  }


  getBusinessByProvider(provider: User) {
    return this.http.get<Business>(environment.businessEndpoint + '/byProviderId/' + provider.id);
  }

}

import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Session} from '../../../shared/models/session';
import {Business} from '../../../shared/models/business';
import {User} from '../../../shared/models/user';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {BusinessService} from '../../../shared/services/business.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  session: Session;
  business: Business;
  provider: User;

  constructor(
    private titleService: Title,
    private auth: AuthenticationService,
    private businessService: BusinessService
  ) {
    titleService.setTitle('Dashboard');
  }

  get session$() {
    return this.auth.session$;
  }


  ngOnInit() {
    this.auth.session$.subscribe( session => {
      this.session = session;
      this.provider = this.session.user;
      this.getBusinessByProvider();
    });
  }

  getBusinessByProvider() {
    this.businessService.getBusinessByProvider(this.provider).subscribe((res: any) => {
        console.log('res', res);
        this.business = res.business;
      },
      error => {
        console.error('error', error);
      });
  }

}

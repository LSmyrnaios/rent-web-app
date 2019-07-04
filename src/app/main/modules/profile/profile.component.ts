import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Session} from '../../../shared/models/session';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editing = false;

  session: Session;

  username: string;

  public constructor(
    private titleService: Title,
    private auth: AuthenticationService
  ) {
    titleService.setTitle('Profile');
  }

  ngOnInit() {
    this.auth.session$.subscribe( session => {
      this.session = session;
      this.username = this.session.user.username;
    });
  }

}

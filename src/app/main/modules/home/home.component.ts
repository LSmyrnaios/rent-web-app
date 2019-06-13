import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Title} from '@angular/platform-browser';
import {first, timeout} from 'rxjs/operators';
import {TextAnimation} from 'ngx-teximate';
import {fadeIn} from 'ng-animate';
import {HttpClient} from '@angular/common/http';
import {FileReaderService} from '../../../shared/services/file-reader.service';
import {FileUploaderService} from '../../../shared/services/file-uploader.service';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  enterAnimation: TextAnimation = {
    animation: fadeIn,
    delay: 5,
    type: 'letter'
  };

  api = environment.apiRoot;

  private users: any;
  destinations = [
    {
      title: 'Meteora',
      image: '../../../../assets/images/forest-1906850_640.jpg'
    },
    {
      title: 'Volos',
      image: '../../../../assets/images/greece-4181705_640.jpg'
    },
    {
      title: 'Athens',
      image: '../../../../assets/images/acropolis-12044_640.jpg'
    },
    {
      title: 'Rome',
      image: '../../../../assets/images/rome-173472_640.jpg'
    },
    {
      title: 'London',
      image: '../../../../assets/images/london-3078109_640.jpg'
    },
    {
      title: 'Paris',
      image: '../../../../assets/images/eiffel-tower-498378_640.jpg'
    },
  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private titleService: Title,
    public uploader: FileUploaderService,
    public reader: FileReaderService
  ) {
    titleService.setTitle('RentCube');
  }

  get session$() {
    return this.auth.session$;
  }

  ngOnInit() {
  }

  login(email: string) {
    this.auth.login({
      email,
      password: 'asdfk2.daADd'
    }).pipe(first())
      .subscribe((response: any) => console.log('response', response));
  }

  forceTimeout() {
    this.http.get('https://httpstat.us/200?sleep=5000')
      .subscribe(response => {
        console.log('forceTimeout', response);
      }, (error) => {
        console.log('Error', error);
      });
  }

  onCompleteItem($event) {
    console.log($event);
  }

  logout() {
    this.auth.logout();
  }

  getUsers() {
    this.http.get('https://localhost:8443/api/users')
      .subscribe(response => {
        console.log('forceTimeout', response);
        this.users = response;
      }, (error) => {
        console.log('Error', error);
      });
  }
}

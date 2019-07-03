import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
      image: '../../../../assets/images/forest-1906850_640.jpg',
      lat : 39.7217,
      lng:  21.6306,
      destination: 'Meteora, Greece'
    },
    {
      title: 'Volos',
      image: '../../../../assets/images/greece-4181705_640.jpg',
      lat : 39.3666,
      lng:  22.9507,
      destination: 'Volos, Greece'
    },
    {
      title: 'Athens',
      image: '../../../../assets/images/acropolis-12044_640.jpg',
      lat : 37.9838,
      lng:  23.7275,
      destination: 'Athens, Greece'
    },
    {
      title: 'Rome',
      image: '../../../../assets/images/rome-173472_640.jpg',
      lat : 41.9028,
      lng:  12.4964,
      destination: 'Rome, Italy'
    },
    {
      title: 'London',
      image: '../../../../assets/images/london-3078109_640.jpg',
      lat : 51.5074,
      lng:  -0.127758,
      destination: 'London, UK'
    },
    {
      title: 'Paris',
      image: '../../../../assets/images/eiffel-tower-498378_640.jpg',
      lat : 48.8566,
      lng:  2.3522  ,
      destination: 'Paris, France'
    },
  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
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

  homepageIconGoToDestination(dst: any) {
    console.log(dst);
    this.router.navigate(['search'], {
      queryParams: {
        destination: dst.destination,
        lat: dst.lat,
        lng: dst.lng,
      }
    });
  }
}

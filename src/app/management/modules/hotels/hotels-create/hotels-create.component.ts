import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../shared/services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {HotelService} from '../../../../shared/services/hotel.service';
import {Hotel} from '../../../../shared/models/hotel';


@Component({
  selector: 'app-hotels-insertion',
  templateUrl: './hotels-create.component.html',
  styleUrls: ['./hotels-create.component.scss']
})
export class HotelsCreateComponent implements OnInit {

  progress = false;
  form: FormGroup;
  isSubmitted: boolean;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {
    titleService.setTitle('Hotels-insertion');
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        number_of_rooms: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        description_short: ['', [Validators.required]],
        description_long: ['', [Validators.required]]
      }
    );
  }

  uploadUrl: string;
  hotel: Hotel;

  ngOnInit() {
    this.isSubmitted = false;
  }

  submit(data: any): void {
    console.log('data', data);
    this.form.markAsPristine();
    this.progress = true;
    this.hotelService.createHotel(data).subscribe((response: any) => {
        console.log('response', response);
        this.hotel = response.hotel;
        this.uploadUrl = environment.hotelsEndpoint + '/' + this.hotel.id + '/photos';
        this.progress = false;
        this.isSubmitted = true;
        /*this.toastr.info('Your hotel \"' + this.hotel.name + '\" has been created!', this.hotel.name,
          {
            timeOut: 8000
          });*/
      },
      error => {
        console.error('error', error);
        this.progress = false;
        this.form.reset();
    });
  }

  onCompleteItem($event) {
    console.log($event);
  }

}

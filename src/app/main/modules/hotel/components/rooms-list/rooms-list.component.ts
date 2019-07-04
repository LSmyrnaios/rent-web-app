import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../../../shared/models/room';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { HotelService } from '../../../../../shared/services/hotel.service';
import { resolveComponentResources } from '@angular/core/src/metadata/resource_loading';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  confirmModal: NzModalRef; // For testing by now

  roomsImages: string[] = [
    'https://s-ec.bstatic.com/images/hotel/max1024x768/101/101482276.jpg',
    'https://s-ec.bstatic.com/images/hotel/max1280x900/101/101482287.jpg',
    'https://images.hoteliers.com/main/2900/4x3/xlarge/uw-7647-hdr.jpg'
  ];

  startDate: string;
  endDate: string;

  @Input() rooms: Room[];
  @Input() hotelID: number;

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {
  }


  ngOnInit() {
    console.log(this.rooms);
    this.rooms.forEach(room => {
      if (room.capacity <= 2) {
        room.image = this.roomsImages[0];
      } else if (room.capacity > 2 && room.capacity <= 4) {
        room.image = this.roomsImages[1];
      } else {
        room.image = this.roomsImages[2];
      }
    });
  }

  reserveRoom(room: Room) {
    this.startDate = this.route.snapshot.queryParamMap.get('startDate') == null ?
      moment(new Date()).format('YYYY-MM-DD') : this.route.snapshot.queryParamMap.get('startDate');

    this.endDate = this.route.snapshot.queryParamMap.get('endDate') == null ?
      moment(new Date()).add(2, 'days').format('YYYY-MM-DD') : this.route.snapshot.queryParamMap.get('endDate');


    console.log('StartDate', this.startDate, 'endDate', this.endDate);

    console.log(room);


    this.confirmModal = this.modal.confirm({
      nzTitle: 'Are you sure you want to book this room from ' + this.startDate + ' to ' + this.endDate + ' ?',
      nzContent: 'When clicked, the room will be booked!',
      nzOnOk: () => this.hotelService.reserveRoom(this.hotelID, room.id, this.startDate, this.endDate).subscribe(() => {
        this.toastr.success('Room successfully booked', 'Thank you for using our services!',
          {
            timeOut: 8000
          });
      })
    });
  }
}

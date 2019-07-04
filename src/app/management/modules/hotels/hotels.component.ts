import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  size = 'large';

  constructor(
    private titleService: Title
  ) {
    titleService.setTitle('Hotels-management');
  }

  createHotel: boolean;

  ngOnInit() {
    this.createHotel = false;
  }

  onClick() {
    this.createHotel = true;
  }

}

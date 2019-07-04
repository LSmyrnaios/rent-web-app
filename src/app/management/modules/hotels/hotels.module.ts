import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ReactiveFormsModule} from '@angular/forms';
import {HotelsCreateComponent} from './hotels-create/hotels-create.component';
import {HomeRoutingModule} from '../../../main/modules/home/home-routing.module';
import {HomeModule} from '../../../main/modules/home/home.module';
import {SearchResultsModule} from '../../../main/modules/search-results/search-results.module';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import {HotelItemListModule} from '../../../shared/components/hotel-item-list/hotel-item-list.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [HotelsComponent, HotelsCreateComponent, HotelsListComponent],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    HomeModule,
    SearchResultsModule,
    HotelItemListModule,
    NgZorroAntdModule
  ]
})
export class HotelsModule { }

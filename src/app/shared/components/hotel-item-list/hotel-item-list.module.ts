import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelItemComponent } from './components/hotel-item/hotel-item.component';
import { HotelItemListComponent } from './hotel-item-list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HotelItemComponent, HotelItemListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HotelItemListComponent,
    HotelItemComponent
  ]
})
export class HotelItemListModule { }

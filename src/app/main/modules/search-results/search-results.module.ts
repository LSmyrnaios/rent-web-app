import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchResultsComponent } from './search-results.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchWidgetComponent } from '../../../shared/components/search-widget/search-widget.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgmCoreModule } from '@agm/core';
import { Ng5SliderModule } from 'ng5-slider';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { HotelItemListModule } from '../../../shared/components/hotel-item-list/hotel-item-list.module';
import { HotelItemListComponent } from '../../../shared/components/hotel-item-list/hotel-item-list.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    FiltersComponent,
    SearchWidgetComponent,
    SortBarComponent
  ],
  exports: [
    FiltersComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AngularFontAwesomeModule,
    AgmCoreModule,
    Ng5SliderModule,
    GooglePlaceModule,
    HotelItemListModule
  ]
})
export class SearchResultsModule {
}

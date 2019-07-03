import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../../../shared/interceptors/jwt.interceptor';
import {ErrorInterceptor} from '../../../shared/interceptors/error.interceptor';
import {mockProvider} from '../../../shared/interceptors/mock.interceptor';
import {VarDirectiveModule} from '../../../shared/directives/var-directive.module';
import {TeximateModule} from 'ngx-teximate';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {TypeaheadModule} from 'ngx-bootstrap';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';

@NgModule({
  declarations: [HomeComponent, SearchBarComponent, FileUploaderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    VarDirectiveModule,
    TeximateModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AngularFontAwesomeModule,
    GooglePlaceModule,
    TypeaheadModule
  ],
  exports: [
    FileUploaderComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    mockProvider
  ]
})
export class HomeModule { }

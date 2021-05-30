import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './components/event-card';
import { EllipsisModule } from 'ngx-ellipsis';
import { CategoryCardComponent } from './components/category-card';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { LocationHeaderComponent } from './components/location-header/location-header.component';
import { GoogleMapsService } from './google-maps';



@NgModule({
  declarations: [
    EventCardComponent,
    CategoryCardComponent,
    GoogleMapsComponent,
    LocationHeaderComponent
  ],
  imports: [
    CommonModule,
    EllipsisModule
  ],
  exports: [
    EventCardComponent,
    CategoryCardComponent,
    GoogleMapsComponent,
    LocationHeaderComponent
  ],
  providers: [
    GoogleMapsService
  ]
})
export class SharedModule { }

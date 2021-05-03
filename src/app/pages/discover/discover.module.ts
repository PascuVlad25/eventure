import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [DiscoverComponent],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    SharedModule
  ]
})
export class DiscoverModule { }

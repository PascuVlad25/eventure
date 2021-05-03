import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './components/event-card';
import { EllipsisModule } from 'ngx-ellipsis';
import { CategoryCardComponent } from './components/category-card';



@NgModule({
  declarations: [
    EventCardComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule,
    EllipsisModule
  ],
  exports: [
    EventCardComponent,
    CategoryCardComponent
  ]
})
export class SharedModule { }

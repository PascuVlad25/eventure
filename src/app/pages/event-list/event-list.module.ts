import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventListPageRoutingModule } from './event-list-routing.module';

import { EventListPage } from './event-list.page';
import { EllipsisModule } from 'ngx-ellipsis';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventListPageRoutingModule,
    EllipsisModule
  ],
  declarations: [EventListPage]
})
export class EventListPageModule {}

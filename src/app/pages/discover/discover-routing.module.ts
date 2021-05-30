import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
  },
  {
    path: 'event-list',
    loadChildren: () => import('../event-list/event-list.module').then( m => m.EventListPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('../event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverRoutingModule {}

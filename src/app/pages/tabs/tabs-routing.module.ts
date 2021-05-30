import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'discover',
        loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'my-events',
        loadChildren: () => import('../my-events/my-events.module').then( m => m.MyEventsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

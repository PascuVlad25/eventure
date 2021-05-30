import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/domain/events';
import { GoogleMapsService } from 'src/app/shared/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  public selectedEvent: Event;
  private subscriptions: Subscription[] = [];

  constructor(private googleMapsService: GoogleMapsService) { }

  public ngOnInit(): void {
    this.subscribeToSelectedEvent();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeToSelectedEvent(): void {
    this.googleMapsService.selectedEvent$.subscribe(selectedEvent => {
      this.selectedEvent = selectedEvent;
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event, EventService } from 'src/app/domain/events';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit, OnDestroy {
  public currentUserEvents: Event[];
  private subscriptions: Subscription[] = [];

  constructor(private eventService: EventService) { }

  public ngOnInit(): void {
    this.eventService.fetchCurrentUserEvents();
    this.subscribeToCurrentUserEvents();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeToCurrentUserEvents(): void {
    this.eventService.currentUserEvents$.subscribe(events => {
      this.currentUserEvents = events;
    });
  }
}

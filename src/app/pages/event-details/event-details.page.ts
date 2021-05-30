import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event, EventService } from 'src/app/domain/events';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit, OnDestroy {
  public event: Event;

  private subscriptions: Subscription[] = [];

  constructor(private eventService: EventService) { }

  public ngOnInit(): void {
    this.subscribeToEventDetails();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getImage(): string {
    if(!this.event || !this.event.image_url) {
      return 'assets/images/no-image.jpg';
    }
    return this.event.image_url;
  }

  public getName(): string {
    return this.event ? this.event.name : '';
  }

  public getDescription(): string {
    return this.event ? this.event.description : '';
  }

  public getDate(): string {
    return this.event ? this.formatDate(this.event.startTime) : '';
  }

  public getLocation(): string {
    return this.event ? 'Online' : '';
  }

  private formatDate(date: Date): string {
    return new Date(date).toDateString();
  }

  private subscribeToEventDetails(): void {
    this.subscriptions.push(this.eventService.selectedEvent$.subscribe(event => {
      this.event = event;
    }));
  }
}

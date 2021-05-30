import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventService } from 'src/app/domain/events';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  public events$: Observable<Event[]> = this.eventService.eventsList$;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  public getDate(event: Event): string {
    return new Date(event.startTime).toDateString();
  }
}

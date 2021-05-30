import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { LocalStorageItems } from 'src/app/shared/utils';
import { User } from '../../authentication';
import { Event, EventPagination, EventQuery, LocationEvent } from '../models';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    public recommendedEvents$: BehaviorSubject<Event[]> = new BehaviorSubject([]);
    public onlineEventsPreview$: BehaviorSubject<Event[]> = new BehaviorSubject([]);
    public currentUserEvents$: BehaviorSubject<Event[]> = new BehaviorSubject([]);
    public eventsList$: BehaviorSubject<Event[]> = new BehaviorSubject([]);
    public locationEvents$: BehaviorSubject<LocationEvent[]> = new BehaviorSubject([]);
    public selectedEvent$: BehaviorSubject<Event> = new BehaviorSubject(null);

    private path = 'events';
    private eventListQuery: EventQuery = null;
    private eventsListPage = 0;
    private eventsListNoOfPages = 0;

    constructor(private httpService: HttpService, private router: Router){}

    public fetchRecommendedEvents(): void {
        const cachedRecommendation: Event[] = JSON.parse(localStorage.getItem(LocalStorageItems.RecommendedEvents));
        if (cachedRecommendation) {
            this.recommendedEvents$.next(cachedRecommendation);
        }
        const currentUser: User = JSON.parse(localStorage.getItem(LocalStorageItems.CurrentUser));
        const pathUrl = `${this.path}/recommended?userId=${currentUser.id}`;
        this.httpService.get<Event[]>(pathUrl).toPromise().then(events => {
            this.recommendedEvents$.next(events);
            localStorage.setItem(LocalStorageItems.RecommendedEvents, JSON.stringify(events));
        }).catch(error => {});
    }

    public fetchOnlineEventsPreview(pageSize: number): void {
        const pathUrl = `${this.path}?pageSize=${pageSize}&isOnline=true`;
        this.httpService.get<EventPagination>(pathUrl).toPromise().then(eventPagination => {
            this.onlineEventsPreview$.next(eventPagination.events);
        }).catch(error => {});
    }

    public fetchListEvents(query: EventQuery): void {
        this.eventListQuery = query;
        const pathUrl = this.buildPathUrl(query);
        this.httpService.get<EventPagination>(pathUrl).toPromise().then(eventPagination => {
            this.eventsListPage = eventPagination.pageNumber;
            this.eventsListNoOfPages = eventPagination.numberOfPages;
            this.eventsList$.next(eventPagination.events);
        }).catch(error => {});
    }

    public fetchLocationEvents(): void {
        const pathUrl = `${this.path}/with-location`;
        this.httpService.get<LocationEvent[]>(pathUrl).toPromise().then(events => {
            this.locationEvents$.next(events);
        }).catch(error => {});
    }

    public fetchNextPage(): void {
        if (this.eventsListPage >= this.eventsListNoOfPages) {
            return;
        }
        this.eventsListPage += 1;
        this.eventListQuery.pageNumber = this.eventsListPage;
        const pathUrl = this.buildPathUrl(this.eventListQuery);
        this.httpService.get<EventPagination>(pathUrl).toPromise().then(eventPagination => {
            const currentEventList = this.eventsList$.value;
            currentEventList.push(...eventPagination.events);
            this.eventsList$.next(currentEventList);
        }).catch(error => {});
    }

    public fetchCurrentUserEvents(): void {
        const pathUrl = `${this.path}/current-user`;
        this.httpService.get<Event[]>(pathUrl).toPromise().then(events => {
            this.currentUserEvents$.next(events);
        }).catch(error => {});
    }

    public goToEventDetailsPage(event: Event): void {
        this.selectedEvent$.next(event);
        this.router.navigate(['tabs/discover/event-details']);
    }

    private buildPathUrl(query: EventQuery): string {
        let pathQuery = '';
        // eslint-disable-next-line guard-for-in
        for(const property in query) {
            pathQuery += `&${property}=${query[property]}`;
        }
        pathQuery = pathQuery !== '' ? `?${pathQuery.substring(1)}` : '';
        return `${this.path}${pathQuery}`;
    }
}

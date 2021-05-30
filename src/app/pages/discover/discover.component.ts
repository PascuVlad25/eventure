/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, CategoryService } from 'src/app/domain/categories';
import { Event, EventQuery, EventService } from 'src/app/domain/events';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  public slideOpts = {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20
  };
  public categories: Category[] = [];
  public onlineEvents: Event[] = [];
  public recommendedEvents: Event[] = [];
  private subscriptions: Subscription[] = [];
    private onlineEventsCount = 8;

  constructor(
      private categoryService: CategoryService,
      private eventService: EventService,
      private router: Router
    ) { }

  public ngOnInit(): void {
    this.fetchInitialData();
    this.subscribeToTopCategories();
    this.subscribeToRecommendedEvents();
    this.subscribeToOnlineEvents();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getRecommendedEvents(): any[] {
    return this.recommendedEvents;
  }

  public getOnlineEvents(): any[] {
    return this.onlineEvents;
  }

  public isRecommendedSectionDisplayed(): boolean {
    return this.recommendedEvents.length > 0;
  }

  public viewEventDetails(event: Event): void {
    this.eventService.goToEventDetailsPage(event);
  }

  public viewCategoryEvents(category: Category): void {
    const query: EventQuery = {category: category.businessKey};
    this.eventService.fetchListEvents(query);
    this.router.navigate(['tabs/discover/event-list']);
  }

  private fetchInitialData(): void {
    this.eventService.fetchRecommendedEvents();
    this.eventService.fetchOnlineEventsPreview(this.onlineEventsCount);
    this.categoryService.fetchCategories();
  }

  private subscribeToTopCategories(): void {
    const subscription = this.categoryService.topCategories$.subscribe(categories => {
      this.categories = categories;
    });
    this.subscriptions.push(subscription);
  }

  private subscribeToRecommendedEvents(): void {
    const subscription = this.eventService.recommendedEvents$.subscribe(events => {
      this.recommendedEvents = events;
    });
    this.subscriptions.push(subscription);
  }

  private subscribeToOnlineEvents(): void {
    const subscription = this.eventService.onlineEventsPreview$.subscribe(events => {
      this.onlineEvents = events;
    });
    this.subscriptions.push(subscription);
  }
}

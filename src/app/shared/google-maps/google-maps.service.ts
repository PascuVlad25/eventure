import { Injectable } from '@angular/core';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { google } from 'google-maps';
import { BehaviorSubject, Subject } from 'rxjs';
import { Event, EventService, LocationEvent } from 'src/app/domain/events';

@Injectable()
export class GoogleMapsService {
    public selectedEvent$: Subject<Event> = new Subject<Event>();

    private locationEvents$: BehaviorSubject<LocationEvent[]>;

    private map: google.maps.Map;

    constructor(private eventService: EventService) {
        this.eventService.fetchLocationEvents();
        this.locationEvents$ = this.eventService.locationEvents$;
    }

    public initialiseMap(mapElement: Element): void {
        this.createMap(mapElement);
        this.createMarkerClusters();
    }

    private createMap(mapElement: Element): void {
        const coords = new google.maps.LatLng(46.769239,23.577354);
        const mapOptions: google.maps.MapOptions = {
          center: coords,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          fullscreenControl: false,
          zoomControl: false
        };

        this.map = new google.maps.Map(mapElement, mapOptions);
    }

    private createMarkerClusters(): void {
        this.locationEvents$.subscribe(events => {
            const markers = this.createMarkers(events);
            const clusterImage = {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            };

            const markerClusterer = new MarkerClusterer(this.map, markers, clusterImage);
        });
    }

    private createMarkers(locationEvents: LocationEvent[]): google.maps.Marker[] {
        const markers = locationEvents.map((event) => this.createMarker(event));
        return markers;
    }

    private createMarker(event: LocationEvent): google.maps.Marker {
        const position = {lat: event.location.latitude, lng: event.location.longitude};
        const marker = new google.maps.Marker({
            position
        });
        marker.addListener('click', () => {
            this.selectedEvent$.next(event);
        });

        return marker;
    }
}

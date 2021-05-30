import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsService } from '../../google-maps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;

  constructor(private googleMapsService: GoogleMapsService) { }

  ngAfterViewInit() {
    this.googleMapsService.initialiseMap(this.mapElement.nativeElement);
  }

}

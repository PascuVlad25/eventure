import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Event } from 'src/app/domain/events';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;

  constructor(private router: Router, private domSantizer: DomSanitizer) { }

  ngOnInit() {
  }

  public getImage(): any {
    if(!this.event) {
      return 'assets/images/no-image.jpg';
    }
    if(this.event.image) {
      return this.domSantizer.bypassSecurityTrustResourceUrl(this.event.image);
    }
    return this.event.image_url ? this.event.image_url : 'assets/images/no-image.jpg';
  }

  public goToViewEvent(): void {
    this.router.navigate([`/event/${this.event.id}`]);
  }
}

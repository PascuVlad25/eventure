import { Event } from './event.model';
import { Location } from './location.model';

export  class LocationEvent extends Event {
    public location: Location;
}

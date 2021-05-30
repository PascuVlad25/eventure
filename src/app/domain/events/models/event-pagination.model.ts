import { Event } from './event.model';

export class EventPagination {
    public events: Event[];
    public numberOfPages: number;
    public pageNumber: number;
    public pageSize: number;
}

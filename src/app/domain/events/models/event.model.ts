export class Event {
    public id: number;
    public name: string;
    public description: string;
    public category: string;
    public startTime: Date;
    public endTime: Date;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public image_url: string;
    public image?: string;
    public isOnline: boolean;
    public url: string;
    public priceMin: number;
    public priceMax: number;
    public currency: string;
    public latitude: number;
    public longitude: number;
}

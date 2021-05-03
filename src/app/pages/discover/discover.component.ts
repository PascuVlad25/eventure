/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryService } from 'src/app/domain/categories';
import { Event } from 'src/app/domain/events';

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
  public recommendedEvents = [
    {id:1,businessKey:'142895405003',name:'CIRKEL Presents: A Pre-Release Screening of Duty Free',description:'Join CIRKEL for a pre-release screening of Duty Free, directed by Sian-Pierre Regis. We\'ll host a live screening followed by a discussion.',categoryId:104,startTime:'2021-05-06T21:30:00',endTime:'2021-05-06T23:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F127903521%2F284752892346%2F1%2Foriginal.20210303-223345?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C70%2C5118%2C2559&s=2323aad9c1df09f599287470b3aa85f6',isOnline:true,url:'https://www.eventbrite.com/e/cirkel-presents-a-pre-release-screening-of-duty-free-tickets-142895405003',priceMin:0,priceMax:0,currency:'USD'},
    {id:2,businessKey:'139987499379',name:'RECONVENE 2021: The Event for Event Creators',description:'A free virtual networking and skillsharing summit about the future of events for independent event creators.',categoryId:101,startTime:'2021-05-20T19:00:00',endTime:'2021-05-21T20:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F132096765%2F272601395150%2F1%2Foriginal.20210413-182406?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C3000%2C1500&s=2c760014a867eb629251ddc3707f5133',isOnline:true,url:'https://www.eventbrite.com/e/reconvene-2021-the-event-for-event-creators-tickets-139987499379',priceMin:0,priceMax:0,currency:'USD'},
    {id:3,businessKey:'149734934219',name:'Al Franken: A Former Senator\'s View of Washington- With a Side of Wit.',description:'Fmr Senator Al Franken, comedian, politician, author, and cultural commentator will give his unique perspective on today\'s political scene',categoryId:112,startTime:'2021-05-06T00:00:00',endTime:'2021-05-06T01:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F133735263%2F223928668448%2F1%2Foriginal.20210429-051935?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C184%2C1274%2C637&s=6c3e5b74440077468d311b169e6e6c41',isOnline:true,url:'https://www.eventbrite.com/e/al-franken-a-former-senators-view-of-washington-with-a-side-of-wit-tickets-149734934219',priceMin:0,priceMax:0,currency:'USD'},
    {id:4,businessKey:'148628021413',name:'The  Legacy of George Floyd',description:'Stand for Racial Justice',categoryId:120,startTime:'2021-05-06T16:00:00',endTime:'2021-05-06T17:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F130592753%2F122004675053%2F1%2Foriginal.20210329-193032?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=67aac7fa8a6cceded15cc03f1f28e53f',isOnline:true,url:'https://www.eventbrite.com/e/the-legacy-of-george-floyd-tickets-148628021413',priceMin:0,priceMax:0,currency:'USD'},
    {id:5,businessKey:'148911370919',name:'NFT Tuesdays',description:'Dive into the world of NFTs in a new six-part series called NFT Tuesdays, presented by Binance.',categoryId:102,startTime:'2021-05-04T18:00:00',endTime:'2021-05-04T19:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F133637523%2F483225115371%2F1%2Foriginal.20210428-130213?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1600%2C800&s=64bf67648140bfd79031e1d1d0a1036d',isOnline:true,url:'https://www.eventbrite.com/e/nft-tuesdays-tickets-148911370919',priceMin:0,priceMax:0,currency:'USD'},
    {id:6,businessKey:'137881428063',name:'A Glitter and Gold Party',description:'A Glitter & Gold Party:  Annual Pre-Mother\'s Day Scholarship Fundraiser',categoryId:113,startTime:'2021-05-08T18:00:00',endTime:'2021-05-08T20:30:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F128686611%2F291940416273%2F1%2Foriginal.20210310-235656?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C35%2C1080%2C540&s=6911202c543c7f7406e0443654056af3',isOnline:true,url:'https://www.eventbrite.com/e/a-glitter-and-gold-party-tickets-137881428063',priceMin:0,priceMax:0,currency:'USD'}];
    public popularEvents = [{id:7,businessKey:'151866437603',name:'Delta Bingo at Home - May 12',description:'Add some fun during lockdown!  Play Bingo at Home and you could WIN cash prizes.  Purchase tickets> Curbside> Play Bingo at home> Have FUN!',categoryId:104,startTime:'2021-05-12T23:00:00',endTime:'2021-05-12T23:30:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F132972381%2F313813025228%2F1%2Foriginal.20210126-135240?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C10%2C4000%2C2000&s=e986d958111019b195f4a9b76bd29c68',isOnline:true,url:'https://www.eventbrite.ca/e/delta-bingo-at-home-may-12-tickets-151866437603',priceMin:0,priceMax:0,currency:'CAD'},
    {id:8,businessKey:'142564607579',name:'Faithful: A Livestream Event',description:'Faithful: A Livestream Event',categoryId:114,startTime:'2021-05-02T00:00:00',endTime:'2021-05-02T02:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F130668011%2F305561621913%2F1%2Foriginal.20210330-122647?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=136df3bd6928c4229bfd6480e304145b',isOnline:true,url:'https://www.eventbrite.com/e/faithful-a-livestream-event-tickets-142564607579',priceMin:0,priceMax:0,currency:'USD'},
    {id:9,businessKey:'147436072261',name:'INSEAD Workshop: Venture Capital, Business Angels, and Starts Ups',description:'INSEAD Workshop: Venture Capital, Business Angels & Start Ups',categoryId:101,startTime:'2021-05-20T09:00:00',endTime:'2021-05-20T12:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F106250564%2F141145280924%2F1%2Foriginal.20200715-234449?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C22%2C1280%2C640&s=de8ae8ccffe98de3f9deb3f858887d8d',isOnline:true,url:'https://www.eventbrite.com/e/insead-workshop-venture-capital-business-angels-and-starts-ups-tickets-147436072261',priceMin:0,priceMax:0,currency:'USD'},
    {id:10,businessKey:'151866048439',name:'Delta Bingo at Home - May 11',description:'Add some fun during lockdown!  Play Bingo at Home and you could WIN cash prizes.  Purchase tickets> Curbside> Play Bingo at home> Have FUN!',categoryId:104,startTime:'2021-05-11T23:00:00',endTime:'2021-05-11T23:30:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F132971893%2F313813025228%2F1%2Foriginal.20210126-135240?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C10%2C4000%2C2000&s=58e4fbc63b97dad0f7810596a3453015',isOnline:true,url:'https://www.eventbrite.ca/e/delta-bingo-at-home-may-11-tickets-151866048439',priceMin:0,priceMax:0,currency:'CAD'},
    {id:11,businessKey:'125680952111',name:'Chronic Stress Kills: How to Combat Burnout Before it’s too Late',description:'The EmpowHer event is a platform for like-minded women to uplift each other, cultivate community, and network with fellow entrepreneurs!',categoryId:113,startTime:'2021-05-07T18:00:00',endTime:'2021-05-07T20:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F133826901%2F264354583755%2F1%2Foriginal.20210429-203107?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=d1ae426daf6f3bf3b679d9cd91a7a21a',isOnline:true,url:'https://www.eventbrite.com/e/chronic-stress-kills-how-to-combat-burnout-before-its-too-late-tickets-125680952111',priceMin:0,priceMax:0,currency:'USD'},
    {id:12,businessKey:'147022166257',name:'CodyTrip - Gita online in Salento, a Taranto e in Valle d\'Itria',description:'CodyTrip online è una gita virtuale all\'insegna del coding, dell\'arte, della cultura, del divertimento e dell\'immaginazione.',categoryId:115,startTime:'2021-05-13T07:00:00',endTime:'2021-05-14T14:00:00',image_url:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F129555971%2F166539674%2F1%2Foriginal.20210318-234047?h=200&w=450&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1632%2C816&s=eb33941aca6fcfe82cedcc1222654fa4',isOnline:true,url:'https://www.eventbrite.com/e/registrazione-codytrip-gita-online-in-salento-a-taranto-e-in-valle-ditria-147022166257',priceMin:0,priceMax:0,currency:'EUR'}];
    private subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService) { }

  public ngOnInit(): void {
    this.subscribeToTopCategories();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getRecommendedEvents(): any[] {
    return this.recommendedEvents;
  }

  public getPopularEvents(): any[] {
    return this.popularEvents;
  }

  private subscribeToTopCategories(): void {
    const subscription = this.categoryService.topCategories$.subscribe(categories => {
      this.categories = categories;
    });
    this.subscriptions.push(subscription);
  }
}

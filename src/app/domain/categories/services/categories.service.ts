import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Category } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    public categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);
    public topCategories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);
    private urlPath = 'categories';

    constructor(private http: HttpService){
        this.fetchCategories();
        this.filterTopCategories([{id:3,businessKey:'117',name:'Home & Lifestyle',icon:'home',color:'#7cdf91',topCategory:false},{id:4,businessKey:'107',name:'Health',icon:'fitness',color:'#e3513e',topCategory:true},{id:5,businessKey:'115',name:'Family & Education',icon:'book',color:'#63a2bb',topCategory:false},{id:6,businessKey:'101',name:'Business',icon:'business',color:'#f5b849',topCategory:false},{id:7,businessKey:'113',name:'Community',icon:'people',color:'#63a2bb',topCategory:false},{id:8,businessKey:'105',name:'Arts',icon:'brush',color:'#f5b849',topCategory:true},{id:9,businessKey:'119',name:'Hobbies',icon:'telescope',color:'#7cdf91',topCategory:true},{id:10,businessKey:'111',name:'Charity & Causes',icon:'help-buoy',color:'#63a2bb',topCategory:false},{id:11,businessKey:'118',name:'Auto, Boat & Air',icon:'car-sport',color:'#63a2bb',topCategory:false},{id:12,businessKey:'103',name:'Music',icon:'musical-notes',color:'#4b6ab9',topCategory:true},{id:13,businessKey:'112',name:'Government',icon:'newspaper',color:'#63a2bb',topCategory:false},{id:14,businessKey:'116',name:'Holiday',icon:'sunny',color:'#f5b849',topCategory:false},{id:15,businessKey:'110',name:'Food & Drink',icon:'fast-food',color:'#e3513e',topCategory:true},{id:16,businessKey:'106',name:'Fashion',icon:'diamond',color:'#4b6ab9',topCategory:false},{id:17,businessKey:'108',name:'Sports & Fitness',icon:'basketball',color:'#7cdf91',topCategory:true},{id:18,businessKey:'114',name:'Spirituality',icon:'leaf',color:'#7cdf91',topCategory:false},{id:19,businessKey:'199',name:'Other',icon:'bulb',color:'#f5b849',topCategory:false},{id:20,businessKey:'109',name:'Travel & Outdoor',icon:'earth',color:'#e3513e',topCategory:false},{id:21,businessKey:'104',name:'Film & Media',icon:'film',color:'#4b6ab9',topCategory:true},{id:22,businessKey:'102',name:'Science & Tech',icon:'flask',color:'#63a2bb',topCategory:false},{id:23,businessKey:'120',name:'School Activities',icon:'school',color:'#f5b849',topCategory:false}]);
    }

    private fetchCategories(): void {
        this.http.get<Category[]>(this.urlPath).subscribe(categories => {
            this.categories$.next(categories);
            this.filterTopCategories(categories);
        });
    }

    private filterTopCategories(categories: Category[]): void {
        const topCategories = categories.filter(category => category.topCategory);
        this.topCategories$.next(topCategories);
    }
}

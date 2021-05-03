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

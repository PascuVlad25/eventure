import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/domain/categories';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;
  private backgroundColor = '';
  // 'f79845', 'e7311b', '1f3b97', '3d6581', '3fada7',
  private colors = [ 'f5b849', 'e3513e', '4b6ab9', '63a2bb', '7cdf91'];

  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  public getBackgroundColor(): string {
    return `#${this.backgroundColor}`;
  }

}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="rating" data-rating="3.5">
      <li class="rating__item"
        *ngFor="let r of [1, 2, 3, 4, 5]; let i = index;"
        [ngClass]="{active: i < rating}"></li>
    </ul>
  `,
  styles: `
    .rating {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: #900;
      margin-bottom: 1rem;

      &__item {
        display: block;
        width: 40px;
        height: 40px;
        background-image: url(/assets/images/star.svg);
        background-repeat: no-repeat;  
        background-position: center center;
        background-size: cover;

        &.active {
          background-image: url(/assets/images/star-fill.svg);
        }
      }
    }
  `
})
export class RatingComponent {
  @Input() rating: number = 5;
}

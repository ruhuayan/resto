import { Component } from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: true,
  template: `
    <div class="icons mt-3">
      <div class="py-4 text-center">Prohibited Items</div>
      <div  class="d-flex justify-content-center align-items-center">
        <div>
          <img class="small-img" src="assets/images/prohibited-Alchohol.png" alt="prohibited-alchohol">
          <div class="text-center">Alchohol</div>
        </div>
        <div>
          <img class="small-img" src="assets/images/prohibited-Alchohol.png" alt="prohibited-alchohol">
          <div class="text-center">Alchohol</div>
        </div>
        <div>
          <img class="small-img" src="assets/images/prohibited-Alchohol.png" alt="prohibited-alchohol">
          <div class="text-center">Alchohol</div>
        </div>
        <div>
          <img class="small-img" src="assets/images/prohibited-Alchohol.png" alt="prohibited-alchohol">
          <div class="text-center">Alchohol</div>
        </div>
        <div>
          <img class="small-img" src="assets/images/prohibited-Alchohol.png" alt="prohibited-alchohol">
          <div class="text-center">Alchohol</div>
        </div>
        <div>
          <img class="small-img" src="assets/images/prohibited-Alchohol.png" alt="prohibited-alchohol">
          <div class="text-center">Alchohol</div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      width: 100%;
      margin:15px 0;
    }
    .icons {
      height: 200px;
      width: 100%;
      background-color: #fff;
      @media only screen and (max-width: 864px) {
        height: 220px;
      }
    }
    .small-img{
      width: 100px;
      height: 100px;
    }
  `
})
export class IconsComponent {
}

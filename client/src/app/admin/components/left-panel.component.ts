import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserRole } from '../admin.models';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex flex-column flex-shrink-0 text-white bg-dark main">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <!-- <img class="top_img" src="assets/images/Logo-KlickShip.png" /> -->
        <img class="top_img" src="assets/images/klickship.svg" />
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto" *ngIf="isAdmin">
          <li class="nav-item">
            <a routerLink="/admin/transactions" class="nav-link text-white" routerLinkActive="active" aria-current="page">
              <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg> -->
              Tables
            </a>
          </li>
          <li>
            <a routerLink="/admin/kiosks" class="nav-link text-white" routerLinkActive="active">
              <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> -->
              Dishes
            </a>
          </li>
          <li>
            <a routerLink="/admin/users" class="nav-link text-white" routerLinkActive="active">
              <!-- <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg> -->
              {{ 'admin.Users' | translate }}
            </a>
          </li>
      </ul>
      <hr>
    </div>
  `,
  styles: `
    :host {
      display: flex;
    }
    .main {
      padding-top: 1rem;
      hr {
        margin: 0.5rem 0;
      }
      > a {
        padding: 0 1rem;
      }
      ul li a {
        padding: .5rem 1rem;
      }
    }
    .nav-pills .nav-link.active {
      border-radius: 0;
      background-color: rgba(31, 41, 55, 1);
      color: #999 !important;
      border-left: 3px solid #fff;
    }
    .top_img {
      padding-top: .4rem;
      padding-left: .5rem;
      width: 150px;
    }
  `
})
export class LeftPanelComponent {
  @Input() role: UserRole | undefined = undefined;
  get isAdmin() {
    return this.role === UserRole.ADMIN;
  }
}

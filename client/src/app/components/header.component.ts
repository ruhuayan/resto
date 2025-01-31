import { Location, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { STEP_NUM } from '../models/shared.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mt-2">
      <div class="col-md-2 mb-2 mb-md-0">
        <a *ngIf="showPrev" class="d-inline-flex link-body-emphasis text-decoration-none" (click)="goBack()">
          <img src="assets/images/arrow-left.svg" alt="Back" />
        </a>
      </div>

      <div class="nav col-md-8 mb-2 justify-content-center mb-md-0 title" *ngIf="showProgress">
        <div class="progress"> 
          <div class="progress-bar" [ngStyle]="{'width': percentage + '%'}"></div> 
        </div>
        <ul class="steps w-100"> 
          <li *ngFor="let active of actives; let i = index" [ngClass]="{active: active}">{{ i + 1}}</li>
        </ul> 
      </div>

      <div class="col-md-2 d-flex justify-content-end">
        <a class="me-3" (click)="toggleInfo()">
          <img src="assets/images/info.svg" alt="Infomation" />
        </a>
        <a class="me-3" *ngIf="showClose" (click)="exit()">
          <img src="assets/images/x.svg" alt="Close" />
        </a>
        <a class="me-3 dropoff" *ngIf="showDropoff" (click)="clickDropoff()">
          <i class="circle">
            <img src="assets/images/dropoff.png" alt="Close" />
          </i>
        </a>
      </div>
    </header>
    <app-modal title="{{ 'Support.Technical' | translate }}" class="text-center" [allowClose]="false" *ngIf="showInfo">
      <div body>
        <div>{{ 'Support.Technical' | translate }}</div>
        <h3>1-855-974-9742</h3>
        <div>{{ 'Support.Customer' | translate }}</div>
        <h3>service&#64;klickship.com</h3>
      </div>
      <div class="text-center w-100" footer>
        <button type="button" class="btn btn-danger rounded-pill btn-lg w-50" data-bs-dismiss="modal" (click)="toggleInfo()">{{ 'common.Close' | translate }}</button>
      </div>
    </app-modal>
  `,
  styles: `
    a {
      cursor: pointer;

      img {
        width: 50px;
      }
      &.dropoff {
        i.circle {
          width: 50px;
          height: 50px;
          border: 2px solid red;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    .progress {
      height: 0.2rem;
      width: 100%;
      margin-top: 1.8rem;
    }
    .progress-bar {
      width: 50%;
      background-color: var(--bs-danger);
    }
    .steps {
      display: flex;
      justify-content: space-between;
      overflow: hidden; 
      color: var(--bs-white);
      padding: 0;
      margin: 0;
      margin-top: -2rem;
    }

    .steps li.active { 
      background-color: var(--bs-danger);
    }

    .steps li { 
      list-style-type: none;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 2rem;
      font-size: 2.5rem;
      background: var(--bs-gray-300);
      text-align: center;
    }
    @media only screen and (max-width: 772px) {
      .title {
        width: 70%;
      }
      .progress {
        margin-top: 1rem;
      }
      .steps {
        margin-top: -1.4rem;
      }
      .steps li { 
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 1.2rem;
        font-size: 1.5rem;
      }
    }
  `
})
export class HeaderComponent {
  @Input() showClose = false;
  @Input() showPrev = true;
  @Input() showDropoff = false;
  @Input() showProgress = true;
  @Input() step = 3;
  @Input() steps : number | null = STEP_NUM;
  @Output() close = new EventEmitter();
  @Output() goback = new EventEmitter();
  @Output() dropoff = new EventEmitter();
  showInfo = false;
  private location = inject(Location);

  constructor() {}

  get actives() {
    return Array.from({length: this.steps ?? STEP_NUM}).map((_, i) => i + 1 < this.step)
  }
  get percentage() {
    return (this.step - 1) / ((this.steps ?? STEP_NUM) - 1) * 100;
  }
  goBack() {
    this.location.back();
    this.goback.emit();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  exit() {
    this.close.emit();
  }
  clickDropoff() {
    this.dropoff.emit();
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { parcelTypeSelector } from '../../state/parcel.selectors';
import { CommonModule } from '@angular/common';
import { ParcelType } from '../../models/shared.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-final-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="page-content" >
    <div class="guide-row row d-flex justify-content-around align-item-center px-2" *ngIf="(parcelType$ | async) === 'envelope'">
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">1</div>
        <div class="span-card">
          <h5>{{ 'shipment.envelope_1' | translate }}</h5>
          <img src="/assets/images/envelope_1.jpg" alt="envelope_1">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">2</div>
        <div class="span-card">
          <h5>{{ 'shipment.envelope_2' | translate }}</h5>
          <img src="/assets/images/envelope_2.jpg" alt="envelope_2">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">3</div>
        <div class="span-card">
        <h5>{{ 'shipment.envelope_3' | translate }}</h5>
        <img src="/assets/images/envelope_3.jpg" alt="nvelope_3">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">4</div>
        <div class="span-card">
          <h5>{{ 'shipment.envelope_4' | translate }}</h5>
          <img src="/assets/images/envelope_4.jpg" alt="envelope_4">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">5</div>
        <div class="span-card">
          <h5>{{ 'shipment.envelope_5' | translate }}</h5>
          <img src="/assets/images/envelope_5.jpg" alt="envelope_5">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">6</div>
        <div class="span-card">
        <h5>{{ 'shipment.envelope_6' | translate }}</h5>
        <img src="/assets/images/envelope_6.jpg" alt="envelope_6">
        </div>
      </div>
    </div>
    <div class="guide-row row d-flex justify-content-around align-item-center px-2" *ngIf="(parcelType$ | async) === 'package'">
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">1</div>
        <div class="span-card">
          <h5>{{ 'shipment.package_1' | translate }}</h5>
          <img src="/assets/images/package_1.jpg"  alt="package_1">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">2</div>
        <div class="span-card">
          <h5>{{ 'shipment.package_2' | translate }}</h5>
          <img src="/assets/images/package_2.jpg" alt="package_2">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">3</div>
        <div class="span-card">
        <h5>{{ 'shipment.package_3' | translate }}</h5>
        <img src="/assets/images/package_3.jpg" alt="package_3">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">4</div>
        <div class="span-card">
          <h5>{{ 'shipment.package_4' | translate }}</h5>
          <img src="/assets/images/package_4.jpg" alt="package_4">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">5</div>
        <div class="span-card">
          <h5>{{ 'shipment.package_5' | translate }}</h5>
          <img src="/assets/images/package_5.jpg" alt="package_5">
        </div>
      </div>
      <div class="guide-card p-4 col-md-5 col-lg-3 text-center rounded-5">
        <div class="span-number rounded-circle d-flex justify-content-center align-content-center h2">6</div>
        <div class="span-card">
        <h5>{{ 'shipment.package_6' | translate }}</h5>
        <img src="/assets/images/package_6.jpg" alt="package_6">
        </div>
      </div>
    </div>
  </div>
  `,
 styleUrls: ['./final-page.component.scss']
})
export class FinalPageComponent {
  parcelType$: Observable<ParcelType | null>;
  private store = inject(Store);
  constructor() {
    this.parcelType$ = this.store.select(parcelTypeSelector);
  }

}

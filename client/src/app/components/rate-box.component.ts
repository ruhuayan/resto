import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-rate-box',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rate m-auto pb-5">
      <div>
        <img class="logo_dhl" src="assets/images/dhl-log.svg" />
      </div>
      <div class="rate-details">
        <h1>$ {{ rate }}</h1>
        <p>{{ 'rateBox.Estimated' | translate }}</p>
        <div class="fs-4">
          {{ estimatedTransitDays }} {{ 'rateBox.Days' | translate }}
        </div>
      </div>
    </div>
  `,
  styles: `
    .rate {
      width: 360px;
      border-radius: 15px;
      color: #000;
      background-image: linear-gradient(180deg, #FC0 0.25%, #FC0 61.94%, #FFE248 99.75%);
      box-shadow: 0px 4.816px 4.816px rgba(0, 0, 0, 0.50);
      padding: 1.5rem 0;

      .logo_dhl {
        margin-bottom: 1rem;
        width: 200px;
      }

      .rate-details h1 {
        border-bottom: 1px solid;
        display: inline-block;
        line-height: 0.95em;
      }
    }
  `
})
export class RateBoxComponent {
  @Input() rate: number | undefined = undefined;
  @Input() estimatedTransitDays: number | undefined = 0;
}

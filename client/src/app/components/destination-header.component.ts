import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination-header',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex flex-wrap align-items-center p-2 mb-2 title">
      <img *ngIf="domestic" src="assets/images/canada.svg" width="45" height="45" alt="Canada">
			<img *ngIf="!domestic" src="assets/images/globe.svg" width="45" height="45" alt="International">
			<div class="mx-3 lh-1">
				<span class="fs-6">{{ prefix }}</span><br />
				<span class="fs-4">{{ title }}</span>
			</div>
		</div>
  `,
  styles: `
    .title {
      background-color: var(--bs-gray-100);
    }
  `
})
export class DestinationHeaderComponent {
  @Input() prefix: string = 'To';
  @Input() domestic: boolean | null = true;

  get title() {
    return this.domestic ? 'Domestic' : 'International';
  }
}

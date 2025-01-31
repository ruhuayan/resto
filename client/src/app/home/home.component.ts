import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ParcelActions } from '../state/parcel.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isValidPickupAddressSelector, languageSelector } from '../state/parcel.selectors';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../components/modal/modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../models/shared.models';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [ModalComponent, CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container text-center">
    
      <div class="content">
        RESTO HOME
      </div>
  </div>
  `,
 styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: TermsComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TermsComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex px-1 g-2 terms">
      <div class="link">
        <img src="assets/images/link.svg" alt="link" />
      </div>
      <div>
        <h5>{{ 'customsInvoice.PressTheButton' | translate }}</h5>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input" type="checkbox" id="flexCheckDefault" (change)="onCheckChange($event)">
          <label class="form-check-label" for="flexCheckDefault">
            {{ 'customsInvoice.Iconfirm' | translate }}
          </label>
        </div>
        <br>
        <a href="https://www.dhl.com/ca-en/home/footer/terms-of-use.html">DHL Terms & Conditions</a>
        &nbsp;&nbsp;
        <a href="https://www.dhl.com/content/dam/dhl/local/se/dhl-freight/documents/pdf/price-increase-documents/se-freight-general-terms-and-conditions-en-01112019.pdf">Klickship Terms & Conditions</a>
      </div>
    </div>
  `,
  styles: `
    :host.ng-invalid.ng-touched,
    :host.ng-invalid.ng-dirty {
      input { border-color: var(--bs-danger);}
    }
    .link img {
			height: 50px;
			margin: .5rem;
		}
		.terms .form-check-input {
			width: 40px;
			height: 35px;
			margin-right: .5rem;
		}
  `
})
export class TermsComponent implements ControlValueAccessor, Validator {
  @Input() disabled = false;
  private value = false;
  private touched = false;
   // ControlValueAccessor methods
   writeValue(value: boolean) {
    this.value = value;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  // Validator method
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value === false) {
      return {
        notExists: 'Must check',
      };
    }
    return null;
  }
  onCheckChange(event: Event) {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = !this.value;
      this.onChange(this.value);
    }
  }
  private onChange = (value: boolean) => {};
  private onTouched = () => {};
  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

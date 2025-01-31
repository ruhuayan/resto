import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, TranslateModule],
	selector: 'app-dropoff-form',
	template: `
  <form class="row m-0" [formGroup]="form" (ngSubmit)="onSubmit()">
    <label class="form-label h4 px-0 py-3">{{ label }}</label>
    <input
      class="form-control"
      type="text"
      formControlName="barcode"
      placeholder="Example: JD014600011849046633"
      aria-label="Example: JD014600011849046633"
      maxlength="35"
      minlength="10"
      required
    />
    <div class="row g-2 justify-content-center">
      <button [disabled]="!form.valid"
        type="submit"
        class="btn btn-danger rounded-pill w-50 btn-lg">
        {{ 'common.Next' | translate }}
      </button>
    </div>
  </form>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropoffFormComponent {
	form: FormGroup;
  @Input() label: string = '';
	@Output() submitForm = new EventEmitter<string>();

	constructor(private formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			barcode: new FormControl(''),
		});
	}

	onSubmit() {
		this.submitForm.emit(this.form.value.barcode);
	}
}

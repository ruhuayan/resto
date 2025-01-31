import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RateBoxComponent } from '../rate-box.component';
import { RateResponse } from '../../models/rateResponse';
import { ParcelType } from '../../models/shared.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RateBoxComponent, TranslateModule],
	selector: 'app-rate-confirm-form',
	templateUrl: './rate-confirm-form.component.html',
	styles: `
		.verification input.ng-invalid {
			border-color: var(--bs-danger);
			&::placeholder {
				color: var(--bs-danger);
			}
		}
		.enabled {
			cursor: pointer
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateConfirmFormComponent implements OnInit {
	form: FormGroup;
	isParcelPackage = false;
	@Input() rateResponse: RateResponse | null = null;
	@Input() packages: number | null | undefined = 0;
	@Input()
	set parcelType(type: ParcelType | null | undefined) {
		this.isParcelPackage = type === ParcelType.PACKAGE;
		if (this.isParcelPackage) {
			this.form.get('verification')?.addValidators(Validators.required);
		}
	}
	@Output() submitForm = new EventEmitter();
	@Output() resetForm = new EventEmitter();

	constructor(private formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			verification: new FormControl(''),
		});
	}
	ngOnInit(): void {}

	onReset() {
		this.resetForm.emit();
	}
	onSubmit() {
		this.submitForm.emit();
	}
	rateBoxClicked() {
		if (this.form.valid) {
			this.submitForm.emit();
		}
	}
}

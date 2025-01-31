import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CustomerDetails } from '../../models/customerDetails';
import { isValidPickupAddress } from '../../state/parcel.selectors';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-pickup-address-form',
	standalone: true,
	imports: [NgIf, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form class="row col-md-8" [formGroup]="form" (ngSubmit)="onSubmit()">
			<div class="row g-2">
				<div class="d-flex" role="search">
					<input
						class="form-control me-2"
						type="search"
						formControlName="_id"
						placeholder="Michine ID"
						aria-label="Search"
					/>
					<ng-container *ngIf="canSearch">
						<button
							*ngIf="readonly"
							type="button"
							class="btn btn-outline-secondary btn-lg"
							(click)="changeMode()"
						>
							<img src="assets/images/edit.svg" alt="Edit" width="24" height="24" />
						</button>
						<button
							*ngIf="!readonly"
							type="button"
							class="btn btn-outline-secondary btn-lg"
							[disabled]="!form.controls['_id'].valid"
							(click)="onSearch(form.controls['_id'].value)"
						>
							<img
								src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiMzMzMzMzMiPjxwYXRoIGQ9Ik02NC41LDE0LjMzMzMzYy0yNy42MjE0LDAgLTUwLjE2NjY3LDIyLjU0NTI3IC01MC4xNjY2Nyw1MC4xNjY2N2MwLDI3LjYyMTQgMjIuNTQ1MjcsNTAuMTY2NjcgNTAuMTY2NjcsNTAuMTY2NjdjMTIuNTI3MzIsMCAyMy45NzI1NiwtNC42NzI0OSAzMi43ODE5LC0xMi4zMTc3MWwzLjA1MTQzLDMuMDUxNDN2OS4yNjYyOGw0Myw0M2wxNC4zMzMzMywtMTQuMzMzMzNsLTQzLC00M2gtOS4yNjYyOGwtMy4wNTE0MywtMy4wNTE0M2M3LjY0NTIxLC04LjgwOTM0IDEyLjMxNzcxLC0yMC4yNTQ1OCAxMi4zMTc3MSwtMzIuNzgxOWMwLC0yNy42MjE0IC0yMi41NDUyNywtNTAuMTY2NjcgLTUwLjE2NjY3LC01MC4xNjY2N3pNNjQuNSwyOC42NjY2N2MxOS44NzUwOSwwIDM1LjgzMzMzLDE1Ljk1ODI0IDM1LjgzMzMzLDM1LjgzMzMzYzAsMTkuODc1MDkgLTE1Ljk1ODI1LDM1LjgzMzMzIC0zNS44MzMzMywzNS44MzMzM2MtMTkuODc1MDksMCAtMzUuODMzMzMsLTE1Ljk1ODI1IC0zNS44MzMzMywtMzUuODMzMzNjMCwtMTkuODc1MDkgMTUuOTU4MjQsLTM1LjgzMzMzIDM1LjgzMzMzLC0zNS44MzMzM3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
								alt="Search"
								width="24"
								height="24"
							/>
						</button>
					</ng-container>
				</div>
				<div class="col-12">
					<input
						class="form-control"
						type="text"
						formControlName="fullName"
						placeholder="Customer Name"
						aria-label="Customer Name"
						required
						readonly
					/>
				</div>
				<div class="col-12">
					<input
						class="form-control"
						type="text"
						formControlName="companyName"
						placeholder="Company Name"
						aria-label="Company Name"
						readonly
					/>
				</div>
				<div class="col-12">
					<input
						class="form-control"
						type="text"
						formControlName="addressLine1"
						placeholder="Address Line 1"
						aria-label="Address Line 1"
						required
						readonly
					/>
				</div>
				<div class="col-12">
					<input
						class="form-control"
						type="text"
						formControlName="addressLine2"
						placeholder="Address Line 2"
						aria-label="Address Line 2"
						readonly
					/>
				</div>
				<div class="col-md-6">
					<input
						class="form-control"
						type="text"
						formControlName="cityName"
						placeholder="City"
						aria-label="City"
						maxlength="45"
						required
						readonly
					/>
				</div>
				<div class="col-md-6">
					<input
						class="form-control"
						type="text"
						formControlName="provinceCode"
						placeholder="Province"
						aria-label="Province"
						maxlength="35"
						readonly
					/>
				</div>
				<div class="col-6">
					<input
						class="form-control"
						type="text"
						formControlName="postalCode"
						placeholder="Postal Code"
						aria-label="Postal Code"
						pattern="[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$"
						maxlength="6"
						required
						readonly
					/>
				</div>
				<div class="col-md-6">
					<select
						formControlName="countryCode"
						class="form-select"
						required
						readonly
					>
						<option value="CA">Canada</option>
					</select>
				</div>
				<div class="col-12">
					<input
						class="form-control"
						type="text"
						formControlName="phone"
						placeholder="Phone"
						aria-label="Phone"
						pattern="^[0-9]*$"
						required
						readonly
					/>
				</div>
				<div class="col-12">
					<input
						class="form-control"
						type="text"
						formControlName="email"
						placeholder="Email"
						aria-label="Email"
						readonly
					/>
				</div>
			</div>

		</form>
	`,
})
export class PickupAddressFormComponent {
	form: FormGroup;
	readonly = false;
	@Input() canSearch: boolean | null = false;
	@Input()
	set address(data: CustomerDetails | null) {
		if (!!data) {
			this.form.patchValue(data);
			this.readonly = isValidPickupAddress(data);
			if (this.readonly) {
				this.form.disable();
			}
		}
	}
	@Output() submitForm = new EventEmitter<CustomerDetails>();
  @Output() search = new EventEmitter<string>();
	private formBuilder = inject(FormBuilder);
	constructor() {
		this.form = this.formBuilder.group({
			_id: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(6),
			]),
			fullName: new FormControl('', [
				Validators.required,
				Validators.maxLength(70),
			]),
			companyName: new FormControl('', [Validators.maxLength(70)]),
			phone: new FormControl('', [
				Validators.required,
				Validators.maxLength(10),
			]),
			email: new FormControl('', [Validators.maxLength(70)]),
			addressLine1: new FormControl('', [
				Validators.required,
				Validators.maxLength(45),
			]),
			addressLine2: new FormControl('', [Validators.maxLength(45)]),
			cityName: new FormControl(''),
			provinceCode: new FormControl('', Validators.minLength(2)),
			postalCode: new FormControl('', Validators.minLength(6)),
			countryCode: new FormControl('', Validators.minLength(2)),
		});
	}

	changeMode() {
		this.form.enable();
		this.readonly = false;
	}
	onSubmit() {
		this.submitForm.emit(this.form.value);
	}
  onSearch(v: string) {
    this.search.emit(v);
  }
}

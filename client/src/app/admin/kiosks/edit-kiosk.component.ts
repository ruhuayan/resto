import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { ModalComponent } from '../../components/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActions } from '../state/user.actions';
import { Kiosk } from '../admin.models';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, TranslateModule, ModalComponent],
	selector: 'app-edit-kiosk',
	template: `
    <app-modal [title]="title" (close)="close()">
      <div body>
        <form class="row col-md-12" [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="row g-2">
            <div class="col-12">
                <input
                  class="form-control me-2"
                  type="search"
                  formControlName="id"
                  placeholder="Kiosk ID"
                  aria-label="Kiosk ID"
                  [readOnly]="isEditMode"
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
            <div class="col-12 mt-2">
            <button
              class="btn btn-lg btn-primary btn-block"
              type="submit"
              [disabled]="!form.valid"
            >
              {{ 'profile.Save' | translate }}
            </button>
            <button type="button" 
              class="btn btn-lg btn-secondary mx-2" 
              data-bs-dismiss="modal" 
              (click)="close()">Cancel</button>
          </div>
          </div>
        </form>
      </div>
    </app-modal>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditKioskComponent implements OnInit {
	form: FormGroup;
  isEditMode = false;
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: new FormControl('', [
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
    this.isEditMode = this.route.snapshot.data['mode'] === 'edit';
    if (this.isEditMode) {
      const kiosk = history.state.kiosk;
      // console.log(kiosk)
      if (!!kiosk) {
        this.form.patchValue({id: kiosk._id, ...kiosk.address});
      }
    }
  }
  ngOnInit(): void { }
  get title() {
    return this.isEditMode ? 'Edit Kiosk' : 'Create Kiosk';
  }
  close() {
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts.pop();
    const newUrl = urlParts.join('/');
    this.router.navigateByUrl(newUrl);
  }
  onSubmit() {
    const {id, others} = this.form.value;
    const kiosk: Kiosk = {_id: this.form.value.id, address: {...others}, openingHours: ''};
    if (this.isEditMode) {
      this.store.dispatch(UserActions.editKiosk({ kiosk }));
    } else {
      this.store.dispatch(UserActions.createKiosk({ kiosk }));
    }
  }
}

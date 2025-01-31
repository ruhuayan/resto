import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomerDetails } from '../../models/customerDetails';
import { pickupAddressSelector } from '../../state/parcel.selectors';
import { PickupAddressFormComponent } from '../components/pickup-address-form.component';
import { ParcelActions } from '../../state/parcel.actions';
import { isAdminSelector } from '../state/user.selectors';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [
		PickupAddressFormComponent,
		CommonModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './settings.component.html',
	styles: `
		:host {
			flex: 1;
		}
	`
})
export class SettingsComponent {
	pickupAddress$: Observable<CustomerDetails | null>;
	isAdmin$: Observable<boolean>;
	accordion = [true, false];

	private store = inject(Store);
	constructor() {
		this.pickupAddress$ = this.store.select(pickupAddressSelector);
		this.isAdmin$ = this.store.select(isAdminSelector);
	}

	onSubmit(pickupDetails: CustomerDetails) {
		// this.store.dispatch(ParcelActions.savePickupDetails({ pickupDetails }));
	}

	onSearch(id: string) {
		this.store.dispatch(ParcelActions.seachMachine({ id }));
	}

	toggle(idx: number) {
		this.accordion = this.accordion.map((v, i) => {
			if (i === idx) return !v;
			return false;
		})
	}
}

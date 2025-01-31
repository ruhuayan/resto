import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { UserActions } from '../state/user.actions';
import { Kiosk } from '../admin.models';
import { kiosksSelector } from '../state/user.selectors';
import { BtnsCellRenderer } from '../components/btns-cell-renderer/btns-cell-renderer.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-kiosks',
	standalone: true,
	imports: [CommonModule, AgGridAngular, RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './kiosks.component.html',
	styles: `
		:host {
			display: flex;
			flex: 1;
		}
		.ag-grid {
			flex: 1;
		}
	`
})
export class KiosksComponent {
	rowData$: Observable<Kiosk[] | null>;
	defaultColDef: ColDef = {
		filter: true
	}
	colDefs: ColDef[] = [
		{
			field: 'ID',
			valueGetter: (params) => params.data?._id,
			width: 100,
		},
		{
			field: 'Full Name',
			valueGetter: (params) => params.data.address?.fullName,
			width: 120,
		},
		{
			field: 'Company Name',
			valueGetter: (params) => params.data.address?.companyName,
		},
		{
			field: 'Address',
			valueGetter: (params) => params.data.address?.addressLine1,
		},
		{
			field: 'City',
			valueGetter: (params) => params.data.address?.cityName,
			width: 100,
		},
		{
			field: 'Province',
			valueGetter: (params) => params.data.address?.provinceCode,
			width: 80,
		},
		{
			field: 'postalCode',
			valueGetter: (params) => params.data.address?.postalCode,
			width: 100,
		},
		{
			field: 'Email',
			valueGetter: (params) => params.data.address?.email,
			filter: true
		},
		{
			field: 'Phone',
			valueGetter: (params) => params.data.address?.phone,
			filter: true
		},
		{
			field: 'Cell',
			valueGetter: (params) => params.data.address?.cell,
			filter: true
		},
		{ field: 'openingHours' },
		{
			field: 'Actions',
			cellRenderer: BtnsCellRenderer,
			cellRendererParams: {
				onEdit: (kiosk: any) => {
					this.router.navigate(['edit'], { state: { kiosk }, relativeTo: this.activatedRoute });
				},
				onDelete: (kiosk: any) => {
					this.store.dispatch(UserActions.deleteKiosk({id: kiosk._id}));
				}
			},
			pinned: 'right',
			filter: false,
		},
	];
	private store = inject(Store);
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	constructor() {
		this.store.dispatch(UserActions.getKiosks());
		this.rowData$ = this.store.select(kiosksSelector);
	}
}

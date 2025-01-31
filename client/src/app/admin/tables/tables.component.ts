import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CommonModule, formatDate } from '@angular/common';
import { UserActions } from '../state/user.actions';
import { Transaction } from '../admin.models';
import { isAdminSelector, transactioinsSelector } from '../state/user.selectors';
import { Package } from '../../models/package';
import { BtnsCellRenderer } from '../components/btns-cell-renderer/btns-cell-renderer.component';

@Component({
	selector: 'app-tables',
	standalone: true,
	imports: [CommonModule, AgGridAngular],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tables.component.html',
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
export class TablesComponent {
	rowData$: Observable<Transaction[] | null>;

	pagination = true;
	paginationPageSize = 10;
	// cacheBlockSize = 10;
	paginationPageSizeSelector = [10, 20, 50, 100];
	defaultColDef: ColDef = {
		filter: true
	}
	colDefs: ColDef[] = [
		{
			field: 'id',
			valueGetter: (params) => params.data?._id,
			width: 80,
		},
		{
			field: 'machineId',
			width: 120,
		},
		{
			field: 'TrackingNumber',
			valueGetter: (params) => params.data.shipmentTrackingNumber,
			width: 120,
		},
		{
			field: 'Sender',
			valueGetter: (params) => {
				const shipperDetails = params.data.shipperDetails;
				return shipperDetails?.cityName + ',' + shipperDetails?.countryCode;
			},
		},
		{
			field: 'Receiver',
			valueGetter: (params) => {
				const receiverDetails = params.data.receiverDetails;
				return receiverDetails?.cityName + ', ' + receiverDetails?.countryCode;
			},
		},
		{
			field: 'Packages',
			cellRenderer: (params: any) => {
				const packages = params.data.packages;
				if (!packages?.length) return '';
				const html = packages.map((p: Package) => `Dimension: ${p.width} x ${p.length} x ${p.height} <br />Weight: ${p.weight}<br />`)
				return `<div>${html}</div>`
			},
		},
		{
			field: 'parcelType',
			width: 100,
		},
		{
			field: 'price',
			valueGetter: (params) => (params.data.price || 0) + ' $',
			width: 100,
		},
		{
			field: 'createdAt',
			valueGetter: (params) => formatDate(params.data?.createdAt, 'YYYY-MM-dd HH:MM:SS', this.locale),
		},
	];
	private store = inject(Store);
	private locale = inject(LOCALE_ID);
	constructor() {
		this.store.dispatch(UserActions.getTransactions());
		this.rowData$ = this.store.select(transactioinsSelector);
		this.store.select(isAdminSelector)
			.pipe(take(1))
			.subscribe(isAdmin => {
				if (isAdmin) {
					this.colDefs.push({
						field: 'Actions',
						cellRenderer: BtnsCellRenderer,
						cellRendererParams: {
							onDelete: (transaction: any) => {
								console.log(transaction)
								this.store.dispatch(UserActions.deleteUser({id: transaction?._id}));
							}
						},
						pinned: 'right',
						filter: false,
						width: 100,
					});
				}
			});
	}
}

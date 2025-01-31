import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CommonModule, formatDate } from '@angular/common';
import { UserActions } from '../state/user.actions';
import { User } from '../admin.models';
import { usersSelector } from '../state/user.selectors';
import { BtnsCellRenderer } from '../components/btns-cell-renderer/btns-cell-renderer.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-users',
	standalone: true,
	imports: [CommonModule, AgGridAngular, RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './users.component.html',
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
export class UsersComponent {
	rowData$: Observable<User[] | null>;

	colDefs: ColDef[] = [
		{ field: 'id', filter: true },
		{ field: 'username', filter: true },
		{ field: 'email', filter: true },
		{ field: 'role', filter: true },
		{
			field: 'createdAt',
			valueGetter: (params) => formatDate(params.data.createdAt, 'YYYY-mm-dd', this.locale),
			filter: true
		},
		{
			field: 'Actions',
			cellRenderer: BtnsCellRenderer,
			cellRendererParams: {
				onEdit: (user: any) => {
					this.router.navigate(['edit'], { state: { user }, relativeTo: this.activatedRoute });
				},
				onDelete: (user: any) => {
					this.store.dispatch(UserActions.deleteUser({id: user?.id}));
				}
			},
			pinned: 'right',
			filter: false,
		}
	];
	private store = inject(Store);
	private locale = inject(LOCALE_ID);
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	constructor() {
		this.store.dispatch(UserActions.getUsers());
		this.rowData$ = this.store.select(usersSelector);
	}
}

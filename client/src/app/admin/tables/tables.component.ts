import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserActions } from '../state/user.actions';
import { areasSelector, tablesSelector } from '../state/user.selectors';
import { Area, Table } from '../admin.models';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
	selector: 'app-tables',
	standalone: true,
	imports: [CommonModule, RouterOutlet, ModalComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tables.component.html',
	styles: `
		:host {
			display: flex;
			flex: 1;
		}
	`
})
export class TablesComponent {
	areaToDelete: Area | null = null;
	areas$: Observable<Area[] | null>;
	tables$: Observable<Table[] | null>;
	private store = inject(Store);
	private locale = inject(LOCALE_ID);
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	constructor() {
		this.store.dispatch(UserActions.getAreas());
		this.store.dispatch(UserActions.getTables());
		this.areas$ = this.store.select(areasSelector);
		this.tables$ = this.store.select(tablesSelector);
	}

	addArea() {
		this.router.navigate(['area-add'], { relativeTo: this.activatedRoute });
	}
	editArea(area: Area) {
		this.router.navigate(['area-edit'], { state: { area }, relativeTo: this.activatedRoute });
	}
	deleteArea(area: Area) {
		this.areaToDelete = area;
	}
	cancelDelete() {
		this.areaToDelete = null;
	}
	delete(area: Area) {
		this.store.dispatch(UserActions.deleteArea({id: area.id}));
		this.areaToDelete = null;
	}
}

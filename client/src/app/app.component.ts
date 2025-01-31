import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { alertSelector, loadingSelector } from './state/parcel.selectors';
import { CommonModule } from '@angular/common';
import { ParcelActions } from './state/parcel.actions';
import { TranslateService } from '@ngx-translate/core';
import { Alert } from './models/Alert';
import { AlertComponent } from './components/alert.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, AlertComponent],
	template: `
		<div class="container" [ngClass]="{ loading: (loading$ | async), admin: (isAdminPage$ | async) }">
			<router-outlet />
			<app-alert *ngIf="alert$ | async" [alert]="alert$ | async" />
		</div>
	`,
})
export class AppComponent {
	private store = inject(Store);
	private router = inject(Router);
	private translate = inject(TranslateService);
	loading$: Observable<boolean>;
  alert$: Observable<Alert | null>;
	isAdminPage$: Observable<boolean>;

	constructor() {
		this.translate.addLangs(['fr', 'en']);
		this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || "en");
		this.loading$ = this.store.select(loadingSelector);
    this.alert$ = this.store.select(alertSelector);
		this.store.dispatch(ParcelActions.getPickupAddress());

		this.isAdminPage$ = this.router.events
			.pipe(
				// takeUntilDestroyed(this.destroyRef),
				filter(evt => evt instanceof NavigationEnd),
				map((evt: NavigationEnd) => evt.url.startsWith('/admin') || evt.url.startsWith('/login'))
			);
	}
}

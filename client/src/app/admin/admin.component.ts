import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftPanelComponent } from './components/left-panel.component';
import { UserActions } from './state/user.actions';
import { filter, Observable } from 'rxjs';
import { User } from './admin.models';
import { userSelector } from './state/user.selectors';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { LanguageEnum } from '../models/shared.models';
import { languageSelector } from '../state/parcel.selectors';
import { ParcelActions } from '../state/parcel.actions';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarComponent, LeftPanelComponent, CommonModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.component.html',
  styles: `
    .container {
      flex-direction: row;
      main {
        flex: 1;
        display: flex;
        flex-direction: column;
        .content {
          display: flex;
        }
      }
    }
  `,
})
export class AdminComponent {
  user$: Observable<User | null>;
  lang$: Observable<LanguageEnum>;
  path: string = '';
  private router = inject(Router);
  private store = inject(Store);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  constructor() {
    this.user$ = this.store.select(userSelector);
    this.lang$ = this.store.select(languageSelector);
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(evt => evt instanceof NavigationEnd),
        // map((evt: NavigationEnd) => {
        //   return evt.url.split('/').filter(v => !!v);
        // })
      ).subscribe((evt: NavigationEnd) => {
        this.path = evt.url;
        // return evt.url.split('/').filter(v => !!v);
      });
  }

  goHome() {
    this.router.navigateByUrl('');
  }

  logout() {
    this.store.dispatch(UserActions.logout());
  }

  selectLang(language: LanguageEnum) {
    this.store.dispatch(ParcelActions.setLanguage({language}));
    this.translate.use(language);
  }

  addNew() {
    this.router.navigateByUrl(`${this.path}/add`);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../admin.models';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageEnum } from '../../../models/shared.models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() lang: LanguageEnum | null = LanguageEnum.EN;
  @Input() user: User | null = null;
  @Input() path: string = '';
  @Output() logout = new EventEmitter();
  @Output() selectLang = new EventEmitter<LanguageEnum>();
  @Output() addNew = new EventEmitter();
  constructor() {}

  get language() {
    return  this.lang === LanguageEnum.EN ? LanguageEnum.FR : LanguageEnum.EN;
  }
  get username() {
    return this.user?.username ?? 'User';
  }

  get canAdd() {
    if (this.path) {
      // const paths = this.path.split('/').filter(v => !!v);
      return /^\/admin\/(users|kiosks)/gi.test(this.path);
    }
    return false;
  }
  onLogout() {
    this.logout.emit();
  }

  changeLang() {
    this.selectLang.emit(this.language);
    this.lang = this.language;
  }

  add() {
    this.addNew.emit();
  }
}

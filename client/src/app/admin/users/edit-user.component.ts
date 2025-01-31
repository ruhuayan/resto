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
import { NgIf } from '@angular/common';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, TranslateModule, ModalComponent, NgIf],
	selector: 'app-edit-user',
	template: `
    <app-modal [title]="title" (close)="close()">
      <div body>
        <form
          class="edit-user-form row g-2"
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
        >
          <div class="col-md-12 col-sm-12">
            <label for="inputUsername" class="form-label"
              >{{ 'login.username' | translate }} *</label
            >
            <input
              type="text"
              id="inputUsername"
              formControlName="username"
              class="form-control"
              placeholder="{{ 'login.username' | translate }} *"
              minlength="6"
              maxlength="50"
              required
              [readOnly]="isEditMode"
            />
          </div>
          <div class="col-md-12 col-sm-12">
            <label for="email" class="form-label"
              >Email *</label
            >
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              minlength="6"
              maxlength="50"
              placeholder="Email *"
              required
            />
          </div>
          <ng-container *ngIf="!isEditMode">
            <div class="col-md-12 col-sm-12">
              <label for="inputPassword" class="form-label"
                >{{ 'login.password' | translate }} *</label
              >
              <input
                type="password"
                id="inputPassword"
                formControlName="password"
                class="form-control"
                minlength="6"
                maxlength="50"
                placeholder="{{ 'login.password' | translate }} *"
                required
              />
            </div>
            <div class="col-md-12 col-sm-12">
              <label for="confirm" class="form-label"
                >Confirm Password *</label
              >
              <input
                type="password"
                id="inputNewPassword"
                formControlName="confirm"
                class="form-control"
                placeholder="Confirm Password *"
                minlength="6"
                maxlength="50"
                required
              />
            </div>
          </ng-container>
          
          <div class="col-sm-12 mt-2">
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
        </form>
      </div>
    </app-modal>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
	form: FormGroup;
  isEditMode = false;
  title = '';
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
    });
    this.isEditMode = this.route.snapshot.data['mode'] === 'edit';
    this.title = this.isEditMode ? 'Edit User' : 'Create User';
    if (this.isEditMode) {
      const user = history.state.user;
      if (!!user) {
        this.form.patchValue(user);
      }
    }
  }
  ngOnInit(): void { }
  close() {
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts.pop();
    const newUrl = urlParts.join('/');
    this.router.navigateByUrl(newUrl);
  }
  onSubmit() {
    if (this.isEditMode) {
      this.store.dispatch(UserActions.editUser({ user: this.form.value }));
    } else {
      this.store.dispatch(UserActions.createUser({user: this.form.value}));
    }
  }
}

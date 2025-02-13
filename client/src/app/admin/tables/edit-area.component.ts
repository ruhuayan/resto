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

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, ModalComponent],
  selector: 'app-edit-area',
  template: `
    <app-modal [title]="title" [showFooter]="false" (close)="close()">
      <div body>
        <form class="row col-md-12" [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="row g-2">
            <div class="col-12">
              <label class="form-label" for="areaName">Name *</label>
              <input
                class="form-control"
                type="text"
                id="areaName"
                formControlName="name"
                placeholder="Area Name"
                aria-label="Area Name"
                maxlength="20"
                required
              />
            </div>
            <div class="col-12">
              <label class="form-label" for="description">Description *</label>
              <input
                class="form-control"
                type="text"
                id="description"
                formControlName="description"
                placeholder="Description"
                aria-label="Description"
                maxlength="256"
                required
              />
            </div>
            <div class="col-12 mt-4">
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
export class EditAreaComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.maxLength(70),
      ]),
      description: new FormControl('', [
        Validators.maxLength(256),
      ]),
    });
    this.isEditMode = this.route.snapshot.data['mode'] === 'edit';
    if (this.isEditMode) {
      const area = history.state.area;
      if (!!area) {
        this.form.patchValue(area);
      }
    }
  }
  ngOnInit(): void { }
  get title() {
    return this.isEditMode ? 'Edit Area' : 'Create Area';
  }
  close() {
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts.pop();
    const newUrl = urlParts.join('/');
    this.router.navigateByUrl(newUrl);
  }
  onSubmit() {
    if (this.isEditMode) {
      this.store.dispatch(UserActions.editArea({ area: this.form.value }));
    } else {
      this.store.dispatch(UserActions.createArea({ area: this.form.value }));
    }
  }
}

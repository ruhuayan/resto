import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, inject, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Option } from '../models/shared.models';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-dropdown',
	standalone: true,
	imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DropdownComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DropdownComponent
    }
  ],
	template: `
		<div class="group" [ngClass]="{listOpen: listOpen}">
      <div class="input-group">
        <ng-content></ng-content>
        <input
          #input
          class="form-control"
          type="text"
          [placeholder]="placeholderValue"
          [attr.aria-label]="placeholder"
          [attr.maxlength]="maxlength"
          [required]="required"
          [disabled]="disabled || !required"
          [readonly]="readonly"
          (input)="onInputChange($event)"
          (focus)="onFocus()"
        />
      </div>
			<ul class="dropdown-menu" *ngIf="filteredOptions.length > 0">
				<li *ngFor="let o of filteredOptions; trackBy: trackByFn">
					<div class="dropdown-item" (click)="onSelect($event, o)">{{ o.description || o.name }}</div>
				</li>
			</ul>
		</div>
	`,
	styles: `
    .group {
      width: 100%;
      position: relative;
      ul {
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
      }
    }
    .group.listOpen ul {
      display: block;
    }
    :host.ng-invalid.ng-touched,
    :host.ng-invalid.ng-dirty {
      input { border-color: var(--bs-danger);}
    }
  `,
})
export class DropdownComponent implements ControlValueAccessor, Validator, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('input') input: ElementRef | undefined;
  @Input()
  set options(_options: Option[] | null) {
    this.allOptions = _options ?? [];
    if (!!this.input) this.setName();
  }
	@Input() required = false;
	@Input() readonly = false;
  @Input() debounce = 300;
  @Input() placeholder = '';
  @Input() maxlength = 100;
  @Output() select = new EventEmitter<Option>();
  @Output() valueChange = new EventEmitter<string>();
  disabled = false;
  listOpen = false;
  private value: string = '';
  private allOptions: Option[] = [];
  private touched = false;
  private inputChange$ = new Subject<string>();
  private unsubscribe$ = new Subject<string>();
  private ref = inject(ElementRef);
  ngOnInit(): void {
    this.inputChange$.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(v => {
      // this.value = v;
      // this.validate({} as AbstractControl);
      this.onChange(v);
      this.valueChange.emit(v);
    });
  }
  ngAfterViewInit(): void {
    this.setName();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next('unsubscribe emit');
    this.unsubscribe$.complete();
  }
  get filteredOptions () {
    if (!this.value) return this.allOptions;
    return this.allOptions.filter(opt => {
      const filter = this.value.replaceAll('', '(.*)');
      return new RegExp(filter, 'gi').test(opt.name);
    });
  }
  get placeholderValue() {
    return `${this.placeholder} ${this.required ? '*':''}`;
  }
  // ControlValueAccessor methods
  writeValue(value: string) {
    this.value = value;
    if (!!this.input) this.setName();
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  // Validator method
  validate(control: AbstractControl): ValidationErrors | null {
    // if (this.allowEmptyOptions) return null;
    if (control.value === undefined) {
      return {
        notExists: 'Control Value',
      };
    }
    return null;
  }
  onInputChange(event: Event) {
    this.markAsTouched();
    if (!this.disabled && !this.readonly) {
      const v = (event.target as HTMLInputElement).value
      this.value = v;
      this.inputChange$.next(v);
      this.listOpen = true;
    }
  }
  onFocus() {
    this.markAsTouched();
    if (!this.disabled && !this.readonly) {
      this.listOpen = true;
    }
  }
  @HostListener("document:click", ['$event', '$event.target']) 
  clicked(event: MouseEvent | TouchEvent, targetElement: HTMLElement) { 
    if (!this.ref.nativeElement.contains(event.target)) {
      this.listOpen = false;
    }
  } 
  onSelect(event: Event, opt: Option) {
    this.listOpen = false;
    event.preventDefault();
    event.stopPropagation();
    this.markAsTouched();
    if (!this.disabled && !this.readonly) {
      this.onChange(opt.value);
      this.setInputValue(opt.name);
      this.select.emit(opt);
    }
  }
  trackByFn(index: number, item: Option) {
		return item.value;
	}
  private onChange = (value: string) => {};
  private onTouched = () => {};
  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  private setName() {
    let name: string;
    if (!this.value || this.allOptions.length === 0) {
      name = this.value;
    } else {
      name = this.allOptions.find(opt => opt.value === this.value)?.name ?? this.value;
    }
    this.setInputValue(name);
  }
  private setInputValue(v: string) {
    if (this.input) {
      this.input.nativeElement.value = v
    }
  }
}

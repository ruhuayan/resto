import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { valueToFormat, unmaskValue } from '../models/mask';

@Directive({
  standalone: true,
  selector: '[appMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: MaskDirective
    }
  ]
})
export class MaskDirective implements OnInit, ControlValueAccessor {
  @Input() appMask: string = '';

  private _lastMaskedValue = '';

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() { }

  // ControlValueAccessor methods
  writeValue(value: string) {
    this._setVal(this._maskValue(value));
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) { }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const v = (event.target as HTMLInputElement).value;
    const unmaskedValue = this._unmaskValue(v);
    this.onChange(unmaskedValue);
  }
  @HostListener('blur', ['$event'])
  onBlur(event: InputEvent) {
    const v = (event.target as HTMLInputElement).value;
    const unmaskedValue = unmaskValue(v);
    this.onChange(unmaskedValue);
  }
  private _maskValue(val: string): string {
    if (!this.appMask || val === this._lastMaskedValue) {
      return val;
    }

    const maskedVal = this._lastMaskedValue =
      valueToFormat(
        val,
        this.appMask, this._lastMaskedValue.length > val.length,
        this._lastMaskedValue);

    return maskedVal;
  }

  private _unmaskValue(val: string): string {
    const maskedVal = this._maskValue(val);
    const unmaskedVal = unmaskValue(maskedVal);

    if (maskedVal !== val) {
      this._setVal(maskedVal);
    }

    return maskedVal ? unmaskedVal : '';
  }

  private _setVal(val: string) {
    this.el.nativeElement.value = val;
  }
  private onTouched = () => {};
  private onChange = (value: string) => {};
}
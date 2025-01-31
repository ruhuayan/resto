import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimText]',
  standalone: true,
})
export class TrimTextDirective {
  constructor(private el: ElementRef, @Optional() private ngControl: NgControl) {}

  @HostListener('blur', ['$event'])
  onBlur(event: KeyboardEvent) {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
    this.ngControl?.control?.setValue(this.el.nativeElement.value);
  }
}

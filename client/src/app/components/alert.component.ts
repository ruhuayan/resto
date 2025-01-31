import { Component, Input } from '@angular/core';
import { Alert } from '../models/Alert';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div [class]="['alert', alertClass]" role="alert">
      {{ message }}
    </div>
  `,
})
export class AlertComponent {
  alertClass: string = '';
  message: string = '';

  @Input()
  set alert(_alert: Alert | null) {
    if (!!_alert) {
      this.message = _alert.message;

      if (_alert.type === 'error') this.alertClass = 'alert-danger';
      else if (_alert.type === 'success') this.alertClass = 'alert-success';
    }
  }
}

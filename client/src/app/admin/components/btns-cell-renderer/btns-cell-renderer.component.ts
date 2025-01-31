import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { TranslateModule } from '@ngx-translate/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btns-cell-renderer',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="onEdit()" *ngIf="canEdit">Edit</button>
    <button (click)="onDelete()" *ngIf="canDelete">Delete</button>
  `,
})
export class BtnsCellRenderer implements ICellRendererAngularComp {
  canEdit: boolean = false;
  canDelete: boolean = false;
  private params: any;
  agInit(params: any): void {
    this.params = params;
    this.canEdit = params?.onEdit instanceof Function;
    this.canDelete = params?.onDelete instanceof Function;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onEdit() {
    this.params.onEdit(this.params.node.data);
  }

  onDelete() {
    this.params.onDelete(this.params.node.data);
  }
}
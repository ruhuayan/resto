import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	standalone: true,
	imports: [ NgIf ],
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: `
		:host.text-center .modal-content {
			.modal-title {
				width: 100%;
			}
		}
		.modal {
			display: block;
			opacity: 1;
			.modal-content {
				box-shadow: 0px 8px 8px #999;
			}
		}
  `,
})
export class ModalComponent implements OnInit {
	@Input() allowClose = true;
	@Input() title = '';
	@Output() close = new EventEmitter();
	ngOnInit(): void {}

	onClose() {
		this.close.emit();
	}
}

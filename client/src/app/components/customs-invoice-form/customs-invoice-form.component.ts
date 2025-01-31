import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
// import { TrimTextDirective } from "../trim-text.directive";
import { LineItem, reasons } from "../../models/invoice";
import { DropdownComponent } from "../dropdown.component";
import { countryOptions } from "../../models/country";
import { initLineItem } from "../../state/parcel.reducer";
import { TermsComponent } from "../terms.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, NgFor, NgIf, DropdownComponent, TermsComponent, TranslateModule],
	selector: "app-customs-invoice-form",
	templateUrl: "./customs-invoice-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomsInvoiceFormComponent implements OnInit {
	form: FormGroup;
	countries = countryOptions;
	reasons = reasons;
	@Input()
	set items(_items: LineItem[] | null) {
		if (!!_items) {
			this.createItemFormGroup(_items);
		}
	}
	get items(): LineItem[] {
		return this.itemFa.value;
	}
	@Output() submitForm = new EventEmitter<any>();
	private itemFa: FormArray;
	private lineItem: LineItem = initLineItem;

	constructor(formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			accept: new FormControl(false, Validators.requiredTrue),
			lineItems: formBuilder.array([]),
		});
		this.itemFa = this.form.controls['lineItems'] as FormArray;
	}
	ngOnInit(): void {}

	get totalValue() {
		return this.itemFa.controls
			.map(fc => (fc.get('price')?.value ?? 0) * (fc.get('quantity')?.value ?? 0))
			.reduce((acc, price) => acc + price, 0);
	}

	createItemFormGroup(_items: LineItem[]) {
		if (this.itemFa.length > 0) return;
		_items.forEach((d) => {
			this.itemFa .push(
				new FormGroup({
					price: new FormControl(d.price),
					quantity: new FormControl(d.quantity),
					description: new FormControl(d.description),
					manufacturerCountry: new FormControl(d.manufacturerCountry),
					exportReasonType: new FormControl(d.exportReasonType),
				})
			);
		});
	}
	addItem() {
		this.itemFa.push(
			new FormGroup({
				price: new FormControl(this.lineItem.price),
				quantity: new FormControl(this.lineItem.quantity),
				description: new FormControl(this.lineItem.description),
				manufacturerCountry: new FormControl(this.lineItem.manufacturerCountry, [Validators.minLength(2), Validators.maxLength(2)]), // countryCode
				exportReasonType: new FormControl(this.lineItem.exportReasonType), 
			})
		);
		this.lineItem = initLineItem;
	}
	removeItem(idx: number) {
		const value = this.itemFa.value;
		this.lineItem = value[idx];
		this.itemFa.setValue(
			value
				.slice(0, idx)
				.concat(value.slice(idx + 1))
				.concat(value[idx])
		);

		this.itemFa.removeAt(value.length - 1);
	}
	onSubmit() {
		this.submitForm.emit(this.form.value.lineItems);
	}
	trackByIndex(index: number, item: LineItem) {
		return index;
	}
}

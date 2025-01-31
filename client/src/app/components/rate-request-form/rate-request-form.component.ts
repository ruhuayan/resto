import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { countriesWithoutPostalCode, countryOptions } from '../../models/country';
import { NgFor, NgIf } from '@angular/common';
import { Parcel } from '../../models/parcel';
import { ParcelType, Option, AddressSearchRequest, AddressBook, FromEnum, DestinationEnum} from '../../models/shared.models';
import { Package } from '../../models/package';
import { RateResponse } from '../../models/rateResponse';
import { initialPackage } from '../../state/parcel.reducer';
import { DestinationHeaderComponent } from '../destination-header.component';
import { TrimTextDirective } from '../trim-text.directive';
import { DropdownComponent } from '../dropdown.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, NgFor, NgIf, DestinationHeaderComponent, TrimTextDirective, DropdownComponent, TranslateModule],
	selector: 'app-rate-request-form',
	templateUrl: './rate-request-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	// styleUrls: ["./rate-request-form.component.scss"],
})
export class RateRequestFormComponent implements OnInit {
	form: FormGroup;
	countries = countryOptions;
	postalCodes: Option[] = [];
	cities: Option[] = [];
	shipperPostalCodes: Option[] = [];
	shipperCities: Option[] = [];
	requirePostalCode = true;
	FromEnum = FromEnum;
	@Input()
	set parcel(data: Parcel | null) {
		if (!!data && !this.hasParcel) {
			this.form.patchValue(data);
			this.createPackageFormGroup(data.packages);
			this.parcelType = data.parcelType;
			this.hasParcel = true;
		}
	}
	@Input()
	set rateResponse(r: RateResponse | null) {
		this._rateResponse = r;
		if (!!r) {
			this.form.disable();
			// this.form.controls['verification'].enable();
		} else {
			this.form.enable();
		}
	}
	get rateResponse(): RateResponse | null {
		return this._rateResponse;
	}
	get isCountryReadonly() {
		return this.destination !== DestinationEnum.OTHERS;
	}
	@Input()
	set shipperAddressbooks(data: AddressBook[] | null) {
		[this.shipperPostalCodes, this.shipperCities] = this.generateAddresses(data);
	}
	@Input()
	set addressbooks(data: AddressBook[] | null) {
		[this.postalCodes, this.cities] = this.generateAddresses(data);
	}
	@Input() destination: DestinationEnum | null = DestinationEnum.OTHERS;
	@Output() submitForm = new EventEmitter<Parcel>();
	@Output() addressChange = new EventEmitter<AddressSearchRequest>();
	@Output() countryChange = new EventEmitter();

	private parcelType: ParcelType | null = null;
	private _rateResponse: RateResponse | null = null;
	private hasParcel = false;
	private shipperFG: FormGroup;
	private receiverFG: FormGroup;
	private package: Package = initialPackage;

	constructor(private formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			kioskId: new FormControl(''),
			// parcelType: new FormControl(''),
			shipperDetails: new FormGroup({
				cityName: new FormControl('', [Validators.minLength(2), Validators.maxLength(45)]),
				postalCode: new FormControl('', [Validators.minLength(6), Validators.maxLength(8),
					 Validators.pattern(/^[a-zA-Z][0-9][a-zA-Z](\s){0,1}[0-9][a-zA-Z][0-9]$/)]),
				provinceCode: new FormControl('', Validators.minLength(2)),
				countryCode: new FormControl('CA'),
			}),
			receiverDetails: new FormGroup({
				cityName: new FormControl('', [Validators.minLength(2), Validators.maxLength(45)]),
				postalCode: new FormControl(''),
				provinceCode: new FormControl('', Validators.minLength(2)),
				provinceName: new FormControl('', Validators.minLength(2)),
				countryCode: new FormControl('', [Validators.minLength(2), Validators.maxLength(2)]),
			}),
			packages: formBuilder.array([]),
		});
		this.receiverFG = this.form.controls['receiverDetails'] as FormGroup;
		this.shipperFG = this.form.controls['shipperDetails'] as FormGroup;
	}
	ngOnInit(): void {}

	get domestic() {
		return this.destination === DestinationEnum.CA;
	}
	get isParcelPackage() {
		return this.parcelType === ParcelType.PACKAGE;
	}

	get packages(): Package[] {
		return this.form.controls['packages'].value;
	}

	createPackageFormGroup(packages: Package[]) {
		const packageGroup = this.form.controls['packages'] as FormArray;
		if (packageGroup.length > 0) return;
		packages.forEach((d) => {
			packageGroup.push(
				new FormGroup({
					weight: new FormControl(d.weight),
					width: new FormControl(d.width),
					height: new FormControl(d.height),
					length: new FormControl(d.length),
				})
			);
		});
	}
	addPackage() {
		const packageGroup = this.form.controls['packages'] as FormArray;
		packageGroup.push(
			new FormGroup({
				weight: new FormControl(this.package.weight),
				width: new FormControl(this.package.width),
				height: new FormControl(this.package.height),
				length: new FormControl(this.package.length),
			})
		);
		this.package = initialPackage;
	}
	removePackage(idx: number) {
		const packageGroup = this.form.controls['packages'] as FormArray;
		const value = packageGroup.value;
		this.package = value[idx];
		packageGroup.setValue(
			value
				.slice(0, idx)
				.concat(value.slice(idx + 1))
				.concat(value[idx])
		);

		packageGroup.removeAt(value.length - 1);
		// packageGroup.removeAt(idx);
		// this.appRef.tick();
	}

	trackByIndex(index: number, item: Package) {
		return index;
	}
	onPostalCodeChanged(v: string, from: FromEnum) {
		const isShipper = from === FromEnum.SHIPPER;
		const fg = isShipper ? this.shipperFG : this.receiverFG;
		if (isShipper || this.requirePostalCode && !!fg.value.countryCode) {
			this.addressChange.emit({control: 'postalCode', value: v, countryCode: fg.value.countryCode, from});
		}
	}
	onCityNameChanged(v: string, from: FromEnum) {
		const fg = from === FromEnum.SHIPPER ? this.shipperFG : this.receiverFG;
		if (!!fg.value.countryCode) {
			this.addressChange.emit({control: 'city', value: v, countryCode: fg.value.countryCode, from});
		}
	}
	onAddressSelect(opt: Option, control: string, from: FromEnum) {
		if (!opt.item) return;
		const fg = from === FromEnum.SHIPPER ? this.shipperFG : this.receiverFG;
		if (control === 'postalCode') {
			fg.controls['cityName'].setValue(opt.item.city)
		} else if (!!opt.item.postalCode && !fg.controls['postalCode'].value?.includes(opt.item.postalCode)) {
			fg.controls['postalCode'].setValue(opt.item.postalCode);
		}
		if (!!opt.item.countryDivisionCode) {
			fg.controls['provinceCode'].setValue(opt.item.countryDivisionCode);
			fg.controls['provinceName']?.setValue(opt.item.countryDivisionName);
		} else {
			fg.controls['provinceCode'].setValue('');
			fg.controls['provinceName']?.setValue('');
		}
	}
	onCountrySelect(opt: Option) {
		this.requirePostalCode = !countriesWithoutPostalCode.includes(opt.value?.toUpperCase());
		this.receiverFG.patchValue({
			cityName: '',
			postalCode: !this.requirePostalCode ? 'N/A' : '',
			provinceCode: '',
		})
		this.countryChange.emit();
	}
	onSubmit() {
		this.submitForm.emit({...this.form.value, parcelType: this.parcelType});
	}

	private generateAddresses(addressbooks: AddressBook[] | null) {
		const postalCodes: Option[] = [];
		const cities: Option[] = [];
		if (!addressbooks || !addressbooks.length) {
			return [postalCodes, cities];
		}
		const citySet = new Set();
		for (const address of addressbooks) {
			const city: Option = {
				value: address.city,
				name: address.city,
				description: !address.postalCode ? address.city : `${address.city} ${address.postalCode}`,
				item: address,
			};

			if (!!address.postalCode) {
				const code: Option = {
					value: address.postalCode,
					name: address.postalCode,
					description: `${address.postalCode} ${address.city}`,
					item: address,
				};
				postalCodes.push(code);
			} else if (citySet.has(address.city)) {
				continue;
			}
			citySet.add(address.city);
			cities.push(city);
		}
		return [postalCodes, cities];
	}
}

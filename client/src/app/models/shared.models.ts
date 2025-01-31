import { CustomerDetails } from "./customerDetails";

export enum LanguageEnum {
	EN = 'en',
	FR = 'fr',
}

export enum ParcelType {
	ENVELOPE = 'envelope',
	PACKAGE = 'package',
}
export enum DestinationEnum {
	CA = 'CA',
	US = 'US',
	OTHERS = 'OTHERS',
}

export const CANADA_CODE = 'CA';

export interface PickupDetails extends CustomerDetails {
	_id: string | null;
}

export interface Option {
	value: string;
	name: string;
	description?: string;
	item?: any;
}

export interface AddressBook {
	city: string;
	country: string;
	postalCode?: string;
	countryDivisionCode?: string;
}
export enum FromEnum {
	RECEIVER = 'receiver',
	SHIPPER = 'shipper',
}
export interface AddressSearchRequest {
	control: 'postalCode' | 'city' | 'state';
	value: string;
	countryCode: string;
	from: FromEnum;
}

export const STEP_NUM = 6;

export const API_URL = 'http://localhost:3000/api';

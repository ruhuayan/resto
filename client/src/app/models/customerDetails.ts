export interface CustomerDetails {
	fullName: string;
	companyName?: string; // max: 70
	phone: string; // max: 70
	email?: string; // max: 70
	addressLine1: string; // max: 45
	// addressLine2?: string; // max: 45
	cityName: string; // max:45
	provinceCode?: string; // min: 2, max: 35
	provinceName?: string; // min: 1, max: 35
	countryCode: string; // = 2
	postalCode: string; // min: 0, max: 12
}

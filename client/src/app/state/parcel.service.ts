import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Parcel } from "../models/parcel";
import { AddressSearchRequest, API_URL } from "../models/shared.models";

@Injectable({
	providedIn: "root",
})
export class ParcelService {
	constructor(private http: HttpClient) {}

	rateRquest(parcel: Parcel) {
		return this.http.post<any>(`${API_URL}/rate-request`, parcel);
	}

	sendReceipt(parcel: Parcel) {
    return this.http.post(`${API_URL}/send-receipt`, parcel);
  }

  createShipment(parcel: Parcel) {
    return this.http.post(`${API_URL}/shipments`, parcel);
  }

	searchMichineById(id: string) {
		return this.http.get<any>(`${API_URL}/machines/${id}`);
	}

	searchAddressBook(request: AddressSearchRequest) {
		return this.http.post(`${API_URL}/addressbook`, request);
	}
}

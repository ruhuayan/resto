import { createReducer, on } from "@ngrx/store";
import { AddressBook, CANADA_CODE, DestinationEnum, LanguageEnum, ParcelType, PickupDetails } from "../models/shared.models";
import { ParcelActions } from "./parcel.actions";
import { CustomerDetails } from "../models/customerDetails";
import { Package } from "../models/package";
import { RateResponse } from "../models/rateResponse";
import { LineItem } from "../models/invoice";
import { Alert } from "../models/Alert";

export interface State {
  language: LanguageEnum;
  parcelType: ParcelType | null;
  destination: DestinationEnum;
  shipperDetails: CustomerDetails;
  receiverDetails: CustomerDetails;
  pickupDetails: PickupDetails | null;
  packages: Package[];
  lineItems: LineItem[]; // only for international package
  // unitOfMeasurement: UnitOfMeasurement;
  rateResponse: RateResponse | null;
  confirmed: boolean;
  paid: boolean;
  shipmentTrackingNumber: string | null;
  loading: boolean;
  documents: string[];
  alert: Alert | null;
  addressBooks: AddressBook[];
  shipperAddressBooks: AddressBook[];
}
const initialCustomerDetails: CustomerDetails = {
  fullName: '',
  phone: '',
  email: '',
  addressLine1: '',
  // addressLine2: '',
  cityName: '',
  provinceCode: '',
  provinceName: '',
  countryCode: '',
  postalCode: '',
}

export const initialPackage: Package = {
  weight: 1,
  height: 1,
  length: 1,
  width: 1,
}
export const initLineItem: LineItem = {
  price: 10,
	description: '',
	quantity: 1,
	manufacturerCountry: 'CN',
	exportReasonType: 'gift',
}

export const initState: State = {
  language: LanguageEnum.EN,
  parcelType: ParcelType.PACKAGE,
  destination: DestinationEnum.OTHERS,
  shipperDetails: {
    ...initialCustomerDetails,
    countryCode: CANADA_CODE,
    provinceCode: 'QC',
    provinceName: 'Quebec'
  },
  receiverDetails: initialCustomerDetails,
  pickupDetails: {
    ...initialCustomerDetails,
    _id: null,
    countryCode: CANADA_CODE,
    provinceCode: 'QC',
  },
  packages: [initialPackage],
  lineItems: [initLineItem],
  // unitOfMeasurement: UnitOfMeasurement.IMPERIAL,
  rateResponse: null,
  confirmed: false,
  paid: false,
  shipmentTrackingNumber: null,
  loading: false,
  documents: [],
  alert: null,
  addressBooks: [],
  shipperAddressBooks: [],
}

export const parcelReducer = createReducer(initState,
  on(ParcelActions.reset, (state) => ({...initState, pickupDetails: state.pickupDetails, parcelType: state.parcelType, language: state.language})),
  on(ParcelActions.setLanguage, (state, { language }) => ({...state, language, rateResponse: null })),
  on(ParcelActions.setParcelType, (state, { parcelType }) => {
    const newState = {...state, parcelType, rateResponse: null };
    if (parcelType === ParcelType.PACKAGE) return newState;
    newState.packages = [{weight: 1, length: 13.8, width: 10.8, height: 1}];
    return newState;
  }),
  on(ParcelActions.setDestination, (state, { destination }) => {
    const receiverDetails = destination === state.destination ? state.receiverDetails : initialCustomerDetails;
    return {
      ...state,
      destination,
      rateResponse: null,
      receiverDetails: {
        ...receiverDetails,
        countryCode: destination !== DestinationEnum.OTHERS ? destination: receiverDetails.countryCode,
      }
    };
  }),
  on(ParcelActions.rateRequest, (state, { parcel }) => ({...state, loading: true, ...parcel })),
  on(ParcelActions.setRateRequest, (state, { rateResponse }) => ({...state, loading: false, rateResponse})),
  on(ParcelActions.confirmDetails, (state, { parcel}) => ({ ...state, ...parcel, confirmed: true })),
  on(ParcelActions.createShipment, (state) => ({...state, loading: true })),
  on(ParcelActions.seachMachine, (state) => ({...state, loading: true })),
  on(ParcelActions.setPickupDetails, (state, { pickupDetails }) => ({...state, pickupDetails, loading: false })),
  on(ParcelActions.setAlert, (state, { alert }) => ({...state, loading: false, alert })),
  on(ParcelActions.createShipemntSuccess, (state, { documents, shipmentTrackingNumber }) => ({...state, documents, shipmentTrackingNumber, loading: false })),
  on(ParcelActions.setAddressBooks, (state, { addressBooks }) => ({...state, addressBooks })),
  on(ParcelActions.setShipperAddressBooks, (state, { shipperAddressBooks }) => ({...state, shipperAddressBooks })),
  on(ParcelActions.setLineItems, (state, { lineItems }) => ({...state, lineItems })),
);

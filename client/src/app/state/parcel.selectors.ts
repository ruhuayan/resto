import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './parcel.reducer';
import { Parcel } from '../models/parcel';
import { CANADA_CODE, ParcelType, STEP_NUM } from '../models/shared.models';
import { CustomerDetails } from '../models/customerDetails';
import { AllReviews } from '../models/reviews';

export const featureSelector = createFeatureSelector<
  Readonly<State>
>('parcel');

export const loadingSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.loading;
  }
);

export const languageSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.language;
  }
);

export const parcelTypeSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.parcelType;
  }
);

export const paymentStepSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.parcelType === ParcelType.ENVELOPE ? 5 : 6;
  }
);

export const destinationSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.destination;
  }
);

export const pickupAddressSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.pickupDetails;
  }
);

export const stepNumSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.parcelType === ParcelType.ENVELOPE ? STEP_NUM - 1 : STEP_NUM;
  }
);

export const isValidPickupAddressSelector = createSelector(
  featureSelector,
  (feature) => {
    return isValidPickupAddress(feature.pickupDetails);
  }
);

export const parcelSelector = createSelector(
  featureSelector,
  (feature): Parcel => {
    const { shipperDetails, receiverDetails, packages, pickupDetails, parcelType, shipmentTrackingNumber, rateResponse, lineItems } = feature;
    return {
      kioskId: pickupDetails?._id ?? null,
      shipperDetails,
      receiverDetails,
      parcelType,
      packages,
      // unitOfMeasurement,
      shipmentTrackingNumber,
      price: rateResponse?.rate ?? null,
      lineItems,
    };
  }
);

export const createShipmentRequestSelector = createSelector(
  parcelSelector,
  (parcel) => {
    const shipperDetails = { ...parcel.shipperDetails };
    const receiverDetails = { ...parcel.receiverDetails };
    shipperDetails.companyName = shipperDetails.fullName;
    receiverDetails.companyName = receiverDetails.fullName;
    return {...parcel, shipperDetails, receiverDetails};
  }
);

export const rateResponseSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.rateResponse;
  }
);

export const detailsConfirmedSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.confirmed;
  }
);

export const alertSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.alert;
  }
);

export const documentsSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.documents;
  }
);

export const addressbooksSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.addressBooks;
  }
);
export const shipperAddressbooksSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.shipperAddressBooks;
  }
);

export const lineItemsSelector = createSelector(
  featureSelector,
  (feature) => {
    return feature.lineItems;
  }
);

export const reviewsSelector = createSelector(
  featureSelector,
  (feature) => {
    const countryCode = feature.receiverDetails.countryCode;
    const reviews = AllReviews.filter(r => r.countryCode === countryCode);
    while (reviews.length < 3) {
      const r = AllReviews[Math.floor(Math.random() * AllReviews.length)];
      reviews.push(r);
    }
    return reviews.map(r => ({...r, url: `assets/avatars/${r.author.replace(/\s+/g, '_')}.svg`}));
  }
)

export function isValidPickupAddress(address: CustomerDetails | null): boolean {
  return !!address && !!address.fullName && !!address.addressLine1 && !!address.cityName
    && !!address.postalCode && !!address.phone && address.countryCode === CANADA_CODE;
}

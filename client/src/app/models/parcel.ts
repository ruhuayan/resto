import { CustomerDetails } from "./customerDetails";
import { LineItem } from "./invoice";
import { Package } from "./package";
import { ParcelType } from "./shared.models";

export interface Parcel {
  parcelType: ParcelType | null;
  kioskId: string | null;
  shipperDetails: CustomerDetails;
  receiverDetails: CustomerDetails;
  packages: Package[];
  lineItems: LineItem[];
  // unitOfMeasurement: UnitOfMeasurement;
  shipmentTrackingNumber: string | null;
  price: number | null;
}
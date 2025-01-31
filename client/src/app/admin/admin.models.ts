import { CustomerDetails } from "../models/customerDetails";
import { ParcelType } from "../models/shared.models";

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  username: string;
  // email?: string;
  password?: string;
  token?: string;
  role?: UserRole;
}

export interface PasswordPayload {
  username: string;
  password: string;
  newPassword: string;
  token: string;
}
export interface Transaction {
  // _id: string;
  machineId: string;
  shipmentTrackingNumber: string;
  price: number;
  parcelType: ParcelType;
  shipperDetails: CustomerDetails;
  receiverDetails: CustomerDetails;
  details: string;
  createdAt: Date;
}

export interface Kiosk {
    _id: string;
  address: CustomerDetails;
  openingHours: string;
}

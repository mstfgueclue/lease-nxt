import mongoose, { Schema, Document } from "mongoose";

export enum TransactionStatus {
  Available = "Available",
  UnderContract = "Under Contract",
  Sold = "Sold",
  Pending = "Pending",
  Cancelled = "Cancelled",
}

export enum PropertyType {
  Apartment = "Apartment",
  House = "House",
  Townhouse = "Townhouse",
  Condo = "Condo",
  Commercial = "Commercial",
  Land = "Land",
  Other = "Other",
}

export interface Property {
  title: string;
  description: string;
  country: string;
  address: string;
  owner: string;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  listedDate: Date;
  transactionStatus: TransactionStatus;
  type: PropertyType;
  images?: string[];
}

export interface PropertyDocument extends Property, Document {}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    owner: { type: String, required: true },
    surface: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price: { type: Number, required: true },
    listedDate: { type: Date, required: true },
    transactionStatus: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.Available,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(PropertyType),
      default: PropertyType.Apartment,
      required: true,
    },
    images: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const PropertyModel = mongoose.model<PropertyDocument>(
  "Property",
  PropertySchema,
  "properties"
);

export default PropertyModel;

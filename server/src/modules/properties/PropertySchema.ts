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
  location: string;
  owner: string;
  size: number;
  price: number;
  listedDate: Date;
  transactionStatus: TransactionStatus;
  propertyType: PropertyType;
  images?: string[];
}

export interface PropertyDocument extends Property, Document {}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    listedDate: { type: Date, required: true },
    transactionStatus: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.Available,
      required: true,
    },
    propertyType: {
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

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
  _id: string;
  title: string;
  description: string;
  owner: string;
  price: number;

  country: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  type: PropertyType;

  listedDate: Date;
  transactionStatus: TransactionStatus;
  images?: string[];
}

export type Receipt = {
  propertyId: string;
  transactionHash: string;
  from: string;
  to: string;
  gasUsed: number;
};

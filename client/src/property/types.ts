export enum Status {
  Available = "Available",
  Rented = "Rented",
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

export enum TransactionType {
  REGISTER_RENTAL = "REGISTER_RENTAL",
  REQUEST_RENTAL = "REQUEST_RENTAL",
  APPROVE_RENTAL = "APPROVE_RENTAL",
  DECLINE_RENTAL = "DECLINE_RENTAL",
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
  status: Status;
  images?: string[];
}

export type Receipt = {
  _id: string;
  propertyId: string;
  applicationId: string;
  transactionHash: string;
  from: string;
  gasUsed: number;
  transactionType: TransactionType;
};

export type PopulatedReceipt = Receipt & {
  property: Property;
};

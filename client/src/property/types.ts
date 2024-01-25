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
  // listedDate: Date;
  // transactionStatus: TransactionStatus;
  // propertyType: PropertyType;
  // images?: string[];
}

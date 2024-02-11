import { Property, Receipt } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export async function getProperty(id: string): Promise<Property> {
  const response = await fetch(`${BASE_URL}/api/properties/${id}`);

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(`${BASE_URL}/api/properties`);

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

export async function registerProperty(property: Property) {
  const options = {
    method: "POST",
    body: JSON.stringify(property),
    headers: HEADERS,
  };

  const response = await fetch(`${BASE_URL}/api/properties/register`, options);

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

export async function applyToRent(id: string, from: string) {
  const options = {
    method: "POST",
    body: JSON.stringify({ from }),
    headers: HEADERS,
  };

  const response = await fetch(
    `${BASE_URL}/api/properties/${id}/rent`,
    options
  );

  if (!response.ok) {
    throw new Error("There was an error applying to rent the property");
  }

  return response.json();
}

export async function getReceiptsForProperty(id: string): Promise<Receipt[]> {
  const response = await fetch(`${BASE_URL}/api/properties/${id}/receipts`);

  if (!response.ok) {
    throw new Error("There was an error fetching the receipts");
  }

  return response.json();
}

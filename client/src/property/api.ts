import { Property } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function registerProperty(property: Property) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify(property),
    headers,
  };

  const response = await fetch(`${BASE_URL}/api/properties/register`, options);

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response;
}

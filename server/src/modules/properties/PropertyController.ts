import { Request, Response } from "express";
import * as propertyService from "./PropertyService";
import { Property, PropertyType, TransactionStatus } from "./PropertySchema";

export async function registerProperty(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { from, title, description, location, size, price } = req.body;
    const property: Property = {
      title,
      description,
      location,
      owner: from,
      size,
      price,
      listedDate: new Date(),
      transactionStatus: TransactionStatus.Available,
      propertyType: PropertyType.Apartment,
    };
    await propertyService.registerProperty(property);

    res.json({ message: "Property registered successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function rentProperty(req: Request, res: Response): Promise<void> {
  try {
    const { from, propertyId, rentValue } = req.body;
    await propertyService.rentProperty(from, propertyId, rentValue);

    res.json({ message: "Property rented successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
}

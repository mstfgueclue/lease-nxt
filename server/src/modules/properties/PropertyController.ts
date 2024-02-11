import { Request, Response } from "express";
import * as propertyService from "./PropertyService";
import { Property, PropertyType, TransactionStatus } from "./PropertySchema";

export async function getProperty(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const property = await propertyService.getProperty(id);

    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProperties(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const properties = await propertyService.getProperties();

    res.send(properties);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function registerProperty(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      from,
      title,
      description,
      country,
      address,
      surface,
      bedrooms,
      bathrooms,
      price,
    } = req.body;

    const property: Property = {
      title,
      description,
      country,
      address,
      owner: from,
      surface,
      bedrooms,
      bathrooms,
      price,
      listedDate: new Date(),
      transactionStatus: TransactionStatus.Available,
      type: PropertyType.Apartment,
    };
    await propertyService.registerProperty(property);

    res.json({ message: "Property registered successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function applyToRent(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { from } = req.body;
    const property = await propertyService.applyToRent(from, id);

    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
}

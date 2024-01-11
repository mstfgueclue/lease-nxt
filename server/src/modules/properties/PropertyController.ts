import { Request, Response } from "express";
import * as propertyService from "./PropertyService";

export async function registerProperty(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { from, name, rent } = req.body;
    await propertyService.registerProperty(from, name, rent);

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

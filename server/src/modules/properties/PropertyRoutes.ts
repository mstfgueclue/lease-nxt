import { Router } from "express";
import * as propertyController from "./PropertyController";

const router = Router();
router.get("/properties/:id", propertyController.getProperty);
router.get("/properties", propertyController.getProperties);
router.post("/properties/register", propertyController.registerProperty);
router.post("/properties/:id/rent", propertyController.applyToRent);

export default router;

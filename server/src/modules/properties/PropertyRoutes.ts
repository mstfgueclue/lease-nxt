import { Router } from "express";
import * as propertyController from "./PropertyController";

const router = Router();
router.get("/:id", propertyController.getProperty);
router.get("/", propertyController.getProperties);
router.post("/register", propertyController.registerProperty);
router.post("/:id/rent", propertyController.applyToRent);
router.post("/:id/approve", propertyController.approveApplication);
router.get("/:id/receipts", propertyController.getReceipts);
router.post("/:id/add-to-contract", propertyController.addPropertyToContract);

export default router;

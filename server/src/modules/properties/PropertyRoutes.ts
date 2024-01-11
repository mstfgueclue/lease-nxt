import { Router } from "express";
import * as propertyController from "./PropertyController";

const router = Router();

router.post("/properties/register", propertyController.registerProperty);
router.post("/properties/:id/rent", propertyController.rentProperty);

export default router;

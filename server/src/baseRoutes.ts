import { Router } from "express";
import propertiesRouter from "../src/modules/properties/PropertyRoutes";
import walletsRouter from "../src/modules/wallets/WalletRoutes";

const router = Router();

router.use("/properties", propertiesRouter);
router.use("/wallets", walletsRouter);

export default router;

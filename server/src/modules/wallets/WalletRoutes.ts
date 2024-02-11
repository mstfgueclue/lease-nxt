import { Router } from "express";
import * as walletController from "./WalletController";

const router = Router();

router.get("/:id/receipts", walletController.getWalletReceipts);

export default router;

import { Request, Response } from "express";
import * as walletService from "./WalletService";

export async function getWalletReceipts(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const receipts = await walletService.getWalletReceipts(id);

    res.send(receipts);
  } catch (error) {
    res.status(500).send(error);
  }
}

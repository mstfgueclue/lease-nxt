import ReceiptModel, { ReceiptDocument } from "../receipts/ReceiptSchema";

export async function getWalletReceipts(
  walletId: string
): Promise<ReceiptDocument[]> {
  const walletReceipts = ReceiptModel.find({
    from: walletId,
  })
    .populate("property")
    .exec();

  if (!walletReceipts) {
    throw new Error("No properties found");
  }

  return walletReceipts;
}

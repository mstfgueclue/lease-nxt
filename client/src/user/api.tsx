import { PopulatedReceipt } from "src/property/types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getWalletReceipts(
  walletId: string
): Promise<PopulatedReceipt[]> {
  const response = await fetch(`${BASE_URL}/api/wallets/${walletId}/receipts`);

  if (!response.ok) {
    throw new Error("There was an error fetching the receipts");
  }

  return response.json();
}

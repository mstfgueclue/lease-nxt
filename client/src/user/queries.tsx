import { useQuery } from "@tanstack/react-query";
import { getWalletReceipts } from "./api";

export function useWalletReceiptsQuery(walletId: string) {
  return useQuery({
    queryKey: ["wallets", walletId],
    queryFn: () => getWalletReceipts(walletId),
  });
}

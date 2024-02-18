const fetchCurrentConversionRate = async (): Promise<string> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
  );
  const data = await response.json();
  return data.ethereum.eur;
};

export const getRentInEth = async (priceInEur: number): Promise<number> => {
  const rate = await fetchCurrentConversionRate();
  return priceInEur / Number(rate);
};

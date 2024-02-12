import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useWalletReceiptsQuery } from "../queries";
import { WalletPropertyCard } from "./WalletPropertyCard";

type Properties = {
  walletAddress: string;
};

export const WalletProperties = ({ walletAddress }: Properties) => {
  const { data: receipts, isLoading: isLoadingProperties } =
    useWalletReceiptsQuery(walletAddress);

  if (isLoadingProperties) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl mt-[200px]" />
    );
  }

  if (receipts === undefined || receipts.length === 0) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">
        Sorry, nothing was found.
      </div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {receipts.map((receipt, index) => {
            return (
              <Link to={`/property/${receipt.propertyId}`} key={index}>
                <WalletPropertyCard
                  property={receipt.property}
                  receipt={receipt}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

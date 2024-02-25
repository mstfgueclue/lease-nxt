import toast from "react-hot-toast";
import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { useMetaMask } from "../../auth/useMetaMask";
import Web3 from "web3";
import { Property } from "../../abis/types";
import { getRentInEth } from "../../common/utils";
import { formatPrice } from "../../property/components/utils";
import {
  Property as PropertyType,
  Receipt,
  Status,
} from "../../property/types";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const WalletPropertyCard = ({
  property,
  receipt,
}: {
  property: PropertyType;
  receipt: Receipt;
}) => {
  const { isConnected, wallet } = useMetaMask();
  const isRented = property.status === Status.Rented;
  const payRent = async () => {
    if (!isConnected) {
      toast.error("Please connect your MetaMask wallet.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(Property.abi, CONTRACT_ADDRESS);
      const accounts = wallet.accounts;

      const convertedRent = await getRentInEth(property.price);
      const rentAmount = web3.utils.toWei(convertedRent.toString(), "ether");
      await contract.methods
        .payRent(property._id)
        .send({ from: accounts[0], value: rentAmount });

      toast.success("Rent payment successful!");
    } catch (error) {
      toast.error("Payment failed. See console for details.");
    }
  };

  return (
    <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor pointer hover:shadow-2xl transition">
      <div className="relative mb-8">
        {property.images ? (
          <img src={property.images[0]} alt="Property" className="w-full" />
        ) : (
          <FaHome className="h-auto w-full" />
        )}
        {isRented ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
            <span className="text-white text-xl font-bold">Rented</span>
          </div>
        ) : (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
            <span className="text-white text-xl font-bold">Applied</span>
          </div>
        )}
      </div>
      <div className="mb-4 flex gap-x-2 text-sm">
        <div className="bg-green-500 rounded-full text-white px-3 inline-block">
          {property.type}
        </div>
        <div className="bg-blue-500 rounded-full text-white px-3 inline-block">
          {property.country}
        </div>
      </div>
      <div className="text-lg font-semibold max-w-[260px]">
        {property.address}
      </div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBed />
          </div>
          <div>{property.bedrooms}</div>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBath />
          </div>
          <div>{property.bathrooms}</div>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px] rounded-full">
            <BiArea />
          </div>
          <div className="text-base"> {`${property.surface}m²`}</div>
        </div>
      </div>
      <div className="text-lg font-semibold text-blue-600 mb-4">
        {`${formatPrice(property.price)} €`}
      </div>
      <div>
        <p className="truncate">Wallet: {receipt.from}</p>
        <p className="truncate">Transaction Hash: {receipt.transactionHash}</p>
      </div>
      {isRented && (
        <button
          onClick={payRent}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition w-full"
        >
          Pay Rent
        </button>
      )}
    </div>
  );
};

import { useState } from "react";
import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { PiUserLight } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { useMetaMask } from "../../auth/useMetaMask";
import { applyToRent } from "../api";
import { usePropertyQuery, useReceiptsQuery } from "../queries";
import { formatPrice } from "./utils";
import { useQueryClient } from "@tanstack/react-query";
import { Status, TransactionType } from "../types";

export const PropertyDetails = () => {
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const { data: property, isPending: isLoadingProperty } = usePropertyQuery(id);
  const { data: receipts } = useReceiptsQuery(id);
  const { isConnected, wallet } = useMetaMask();
  const [isApplying, setIsApplying] = useState(false);

  const isApplied = receipts?.some(
    (r) =>
      r.from === wallet.accounts[0] &&
      r.transactionType === TransactionType.REQUEST_RENTAL
  );
  const isRented = property?.status === Status.Rented;
  const isDisabled = isApplied || isRented;

  if (property === undefined) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">
        Sorry, nothing was found.
      </div>
    );
  }

  if (isLoadingProperty) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl mt-[200px]" />
    );
  }

  const handleApplyToRent = async () => {
    setIsApplying(true);
    try {
      await applyToRent(property._id, wallet.accounts[0]);
      await queryClient.invalidateQueries({
        queryKey: ["properties", property._id, "receipts"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["wallets", wallet.accounts[0]],
      });
    } catch (error) {
      console.error("Error applying for rent:", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="container mx-auto mb-14 min-h-[885px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{property.title}</h2>
          <h3 className="text-lg mb-4">{property.address}</h3>
        </div>
        <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
          <div className="bg-green-500 rounded-full text-white px-3 inline-block">
            {property.type}
          </div>
          <div className="bg-blue-500 rounded-full text-white px-3 inline-block">
            {property.country}
          </div>
        </div>
        <div className="text-3xl font-semibold text-blue-600">
          {`${formatPrice(property.price)}€`}
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="max-w-[768px]">
          <div className="mb-8">
            {property.images ? (
              <img
                className="mb-8"
                src={property.images[0]}
                alt="propertyImage"
              />
            ) : (
              <FaHome className="mb-8 h-auto w-full" />
            )}
          </div>
          <div className="flex gap-x-6 text-blue-700 mb-6">
            <div className="flex gap-x-2 items-center">
              <BiBed className="text-2xl" />
              <div className="text-lg font-medium">{property.bedrooms}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <BiBath className="text-2xl" />
              <div className="text-lg font-medium">{property.bathrooms}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <BiArea className="text-2xl" />
              <div className="text-lg font-medium">{property.surface}</div>
            </div>
          </div>
          <p>{property.description}</p>
        </div>
        <div className="flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8">
          <div className="flex items-center gap-x-4 mb-8">
            <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
              {/* <img src={property.agent.image}></img> */}
              <PiUserLight className="w-full h-auto" />
            </div>
            <div>
              <div className="font-bold text-lg">
                {/*property.agent.name*/ "Max Mustermann"}
              </div>
              <Link to="" className="text-blue-700 text-sm">
                View listings
              </Link>
            </div>
          </div>
          <form className="flex flex-col gap-y-4">
            <input
              className="border border-gray-300 focus:border-blue-700 rounded w-full px-4 h-14 text-sm outline-none bg-white"
              type="text"
              placeholder="Name*"
            />
            <input
              className="border border-gray-300 focus:border-blue-700 rounded w-full px-4 h-14 text-sm outline-none bg-white"
              type="text"
              placeholder="Email*"
            />
            <input
              className="border border-gray-300 focus:border-blue-700 rounded w-full px-4 h-14 text-sm outline-none bg-white"
              type="text"
              placeholder="Phone*"
            />
            <textarea
              className="border border-gray-300 focus:border-blue-700 rounded w-full p-4 h-36 text-sm text-gray-500 outline-none resize-none bg-white"
              placeholder="Message*"
              defaultValue={`Hello, I am interested in ${property.title}. Please send me more information.`}
            />
            <div className="flex gap-x-2">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition"
                type="submit"
              >
                Send message
              </button>
              <button className="border border-blue-700 text-blue-700 hover:bg-gray-100 hover:text-blue-600 rounded p-4 text-sm w-full transition bg-white">
                Call
              </button>
            </div>

            {isConnected && (
              <div>
                {isApplying ? (
                  <button
                    disabled={true}
                    className="flex justify-center items-center border border-blue-700 text-blue-700 rounded p-4 text-sm w-full transition bg-white opacity-50 cursor-not-allowed"
                  >
                    <ImSpinner2 className="animate-spin mr-2" /> Applying...
                  </button>
                ) : (
                  <button
                    onClick={handleApplyToRent}
                    disabled={isDisabled}
                    className={`border border-blue-700 text-blue-700 hover:border-blue-600 hover:text-blue-600 rounded p-4 text-sm w-full transition bg-white ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isRented
                      ? "Rented"
                      : isApplied
                      ? "Applied"
                      : "Apply to Rent"}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import { usePropertyQuery } from "../queries";
import { formatPrice } from "./utils";

export const PropertyDetails = () => {
  const { id = "" } = useParams();
  const { data: property, isPending: isLoadingProperty } = usePropertyQuery(id);

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
            {/* <img src={property.image} alt="" /> */}
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
              className="border border-gray-300 focus:border-blue-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Name*"
            />
            <input
              className="border border-gray-300 focus:border-blue-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Email*"
            />
            <input
              className="border border-gray-300 focus:border-blue-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Phone*"
            />
            <textarea
              className="border border-gray-300 focus:border-blue-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
              placeholder="Message*"
              defaultValue="Hello, I am interested in [Modern apartment]"
            />
            <div className="flex gap-x-2">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition"
                type="submit"
              >
                Send message
              </button>
              <button className="border border-blue-700 text-blue-700 hover:border-blue-600 hover:text-blue-600 rounded p-4 text-sm w-full transition">
                Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

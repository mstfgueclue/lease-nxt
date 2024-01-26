import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { Property as PropertyType } from "../types";
import { formatPrice } from "./utils";

export const PropertyCard = ({ property }: { property: PropertyType }) => {
  return (
    <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor pointer hover:shadow-2xl transition">
      <FaHome className="mb-8 h-auto w-full" />
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
    </div>
  );
};

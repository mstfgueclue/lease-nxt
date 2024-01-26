import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { usePropertiesQuery } from "../queries";
import { PropertyCard } from "./PropertyCard";

export const ListProperties = () => {
  const { data: properties, isPending: isLoadingProperties } =
    usePropertiesQuery();

  if (isLoadingProperties) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl mt-[200px]" />
    );
  }

  if (properties === undefined || properties.length === 0) {
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
          {properties.map((property, index) => {
            return (
              <Link to={`/property/${property._id}`} key={index}>
                <PropertyCard property={property} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

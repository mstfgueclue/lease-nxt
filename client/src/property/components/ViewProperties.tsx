import React, { useState, useEffect } from "react";
import { MainAppBarLayout } from "../../common/components/MainAppBarLayout";

interface Property {
  id: string;
  name: string;
  description: string;
  rent: number;
  location: string;
}

export const ViewProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: "1",
        name: "Cozy Apartment",
        description: "A nice cozy apartment in the city center.",
        rent: 1200,
        location: "Downtown",
      },
      {
        id: "2",
        name: "Suburban House",
        description: "Spacious house in a quiet suburb.",
        rent: 2000,
        location: "Suburb",
      },
      // ... more properties
    ];
    setProperties(mockProperties);
  }, []);

  return (
    <MainAppBarLayout>
      <div className="max-w-xl mx-auto p-16 bg-white shadow-lg rounded">
        <div className="grid grid-cols-1 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {property.name}
              </h3>
              <p className="text-gray-700 mb-4">{property.description}</p>

              <div className="grid grid-cols-2">
                <p className="text-gray-700 font-semibold">Location:</p>
                <p className="text-gray-700 text-left">{property.location}</p>
                <p className="text-gray-700 font-semibold">Rent:</p>
                <p className="text-gray-700 text-left">
                  ${property.rent} / month
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainAppBarLayout>
  );
};

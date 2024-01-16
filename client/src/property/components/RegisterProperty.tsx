import React, { useState } from "react";
import { MainAppBarLayout } from "../../common/components/MainAppBarLayout";

const RegisterProperty: React.FC = () => {
  const [property, setProperty] = useState({
    name: "",
    description: "",
    rent: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(property);
  };

  return (
    <MainAppBarLayout>
      <div className="max-w-xl mx-auto p-14 bg-white shadow-lg rounded">
        <form onSubmit={handleSubmit} className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Register Property
          </h2>
          <div>
            <label
              htmlFor="name"
              className="text-sm block text-left font-medium text-gray-700"
            >
              Property Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={property.name}
              onChange={handleChange}
              className="mt-1 block w-full px-16 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm block text-left font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={property.description}
              onChange={handleChange}
              className="mt-1 block w-full px-16 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="rent"
              className="text-sm block text-left font-medium text-gray-700"
            >
              Rent Amount
            </label>
            <input
              type="text"
              name="rent"
              id="rent"
              value={property.rent}
              onChange={handleChange}
              className="mt-1 block w-full px-16 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="text-sm block text-left font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={property.location}
              onChange={handleChange}
              className="mt-1 block w-full px-16 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-16 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </MainAppBarLayout>
  );
};

export default RegisterProperty;

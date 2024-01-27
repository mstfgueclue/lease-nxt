import React, { useState } from "react";
import toast from "react-hot-toast";
import { registerProperty } from "../api";
import { Property } from "../types";

const RegisterProperty: React.FC = () => {
  const [property, setProperty] = useState<Partial<Property>>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    try {
      await registerProperty(property as Property);
      toast.success("Property registered successfully");
    } catch (error) {
      toast.error("Error registering property");
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Register Property
        </h2>
        <div>
          <label
            htmlFor="title"
            className="text-sm block text-left font-medium text-gray-700"
          >
            Property Title
          </label>
          <input
            type="text"
            name="title"
            id="name"
            value={property?.title}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 sm:text-sm"
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
            value={property?.description}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="rent"
            className="text-sm block text-left font-medium text-gray-700"
          >
            Rent Price
          </label>
          <input
            type="text"
            name="rent"
            id="rent"
            value={property?.price}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 sm:text-sm"
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
            value={property?.address}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterProperty;

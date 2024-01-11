import React, { useState, FunctionComponent } from "react";

interface RegisterPropertyProps {
  onRegister: (name: string, rent: number) => void;
}

export const RegisterProperty: FunctionComponent<RegisterPropertyProps> = ({
  onRegister,
}) => {
  const [name, setName] = useState<string>("");
  const [rent, setRent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(name, parseFloat(rent));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-white-700 text-sm font-bold mb-2"
        >
          Property Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white-200 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="rent"
          className="block text-white-700 text-sm font-bold mb-2"
        >
          Rent Amount
        </label>
        <input
          type="number"
          id="rent"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register Property
        </button>
      </div>
    </form>
  );
};

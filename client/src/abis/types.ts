// it is the same as the one in the smart contract, see blockchain/build/contracts/PropertyRental.json
export const Property = {
  abi: [
    {
      inputs: [
        { internalType: "address", name: "_backendAddress", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: false,
          internalType: "address",
          name: "applicant",
          type: "address",
        },
      ],
      name: "LogApplyToRentAttempt",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: false,
          internalType: "address",
          name: "applicant",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "reason",
          type: "string",
        },
      ],
      name: "LogApplyToRentFailure",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "PropertyRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tenant",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "RentPaid",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "applicant",
          type: "address",
        },
      ],
      name: "RentalApproved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "applicant",
          type: "address",
        },
      ],
      name: "RentalDeclined",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "applicationId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "string",
          name: "propertyId",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "applicant",
          type: "address",
        },
      ],
      name: "RentalRequested",
      type: "event",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "properties",
      outputs: [
        { internalType: "string", name: "id", type: "string" },
        { internalType: "address payable", name: "owner", type: "address" },
        { internalType: "uint256", name: "price", type: "uint256" },
        { internalType: "bool", name: "isRented", type: "bool" },
        {
          internalType: "uint256",
          name: "lastPaymentTimestamp",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "rentalApplications",
      outputs: [
        { internalType: "string", name: "propertyId", type: "string" },
        { internalType: "address", name: "applicant", type: "address" },
        { internalType: "bool", name: "isApproved", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        { internalType: "string", name: "_id", type: "string" },
        { internalType: "address payable", name: "_owner", type: "address" },
        { internalType: "uint256", name: "_price", type: "uint256" },
      ],
      name: "registerProperty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_propertyId", type: "string" },
        { internalType: "address", name: "_applicant", type: "address" },
      ],
      name: "applyToRent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_applicationId", type: "uint256" },
      ],
      name: "approveRental",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_applicationId", type: "uint256" },
      ],
      name: "declineRental",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_propertyId", type: "string" }],
      name: "payRent",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
  ],
} as const;

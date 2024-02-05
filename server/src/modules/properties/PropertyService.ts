import { Contract, Web3 } from "web3";
import dotenv from "dotenv";
import { PropertyABI } from "./types";
import PropertyModel, { Property } from "./PropertySchema";

dotenv.config();

const web3 = new Web3(process.env.GANACHE_URL);
const contractAddress = process.env.PROPERTY_RENTAL_CONTRACT_ADDRESS;
const backendAddress = process.env.BACKEND_ADDRESS;
const backendPrivateKey = process.env.BACKEND_PRIVATE_KEY;

if (backendPrivateKey === undefined) {
  throw new Error("Backend private key is missing");
}

// Configure web3 to use the backend's private key for transactions
const account = web3.eth.accounts.privateKeyToAccount(backendPrivateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// get property by id from db
export async function getProperty(id: string): Promise<Property> {
  const property = await PropertyModel.findById(id).exec();

  if (!property) {
    throw new Error("No property found");
  }

  return property;
}

export async function getProperties(): Promise<Property[]> {
  const properties = PropertyModel.find().exec();

  if (!properties) {
    throw new Error("No properties found");
  }

  return properties;
}

export async function registerProperty(property: Property) {
  const propertyDocument = await PropertyModel.create(property);
  if (!propertyDocument) {
    throw new Error("Failed to create property");
  }

  const contract = new Contract(PropertyABI.abi, contractAddress, web3);

  const gas = await contract.methods
    .registerProperty(
      String(propertyDocument._id),
      propertyDocument.title,
      propertyDocument.price
    )
    .estimateGas({ from: backendAddress });

  const receipt = await contract.methods
    .registerProperty(
      String(propertyDocument._id),
      propertyDocument.title,
      propertyDocument.price
    )
    .send({ from: backendAddress, gas: gas.toString() });

  console.log(receipt);
}

export async function applyToRent(fromAddress: string, propertyId: string) {
  const property = await PropertyModel.findById(propertyId).exec();
  if (!property) {
    throw new Error("No property found");
  }

  // Create the contract instance
  const contract = new Contract(PropertyABI.abi, contractAddress, web3);

  // Estimate Gas for the transaction
  const gas = await contract.methods
    .applyToRent(String(property._id), fromAddress)
    .estimateGas({ from: backendAddress });
  console.log("gas", gas.toString());

  // Send the transaction to the smart contract
  const receipt = await contract.methods
    .applyToRent(String(property._id), fromAddress)
    .send({ from: backendAddress, gas: gas.toString() });

  console.log("receipt", receipt);
}

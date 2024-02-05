import { Contract, Web3 } from "web3";
import dotenv from "dotenv";
import { PropertyABI } from "./types";
import PropertyModel, { Property } from "./PropertySchema";

dotenv.config();

const web3 = new Web3(process.env.GANACHE_URL);
const contractAddress = process.env.REGISTER_PROPERTY_CONTRACT_ADDRESS;

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
  const accounts = await web3.eth.getAccounts();
  const contract = new Contract(PropertyABI.abi, contractAddress, web3);
  const receipt = await contract.methods
    .registerProperty(property.title, property.price)
    .send({ from: accounts[0], gas: "200000" });

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

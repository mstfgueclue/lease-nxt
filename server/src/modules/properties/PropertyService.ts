import dotenv from "dotenv";
import { Contract, Web3 } from "web3";
import { ReceiptDocument } from "../receipts/ReceiptSchema";
import {
  createReceipt,
  estimateGas,
  hasAlreadyApplied,
  sendTransaction,
} from "../receipts/ReceiptService";
import PropertyModel, { Property, PropertyDocument } from "./PropertySchema";
import { PropertyABI } from "./types";

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

export async function getProperty(id: string): Promise<PropertyDocument> {
  const property = await PropertyModel.findById(id).exec();

  if (!property) {
    throw new Error("No property found");
  }

  return property;
}

export async function getProperties(): Promise<PropertyDocument[]> {
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
      propertyDocument.owner,
      propertyDocument.title,
      propertyDocument.price
    )
    .send({ from: backendAddress, gas: gas.toString() });

  console.log(receipt);
}

export async function addPropertyToContract(
  propertyId: string,
  owner: string,
  price: number
): Promise<ReceiptDocument> {
  const property = await getProperty(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  const contract = new Contract(PropertyABI.abi, contractAddress, web3);
  const gas = await contract.methods
    .registerProperty(propertyId, owner, price)
    .estimateGas({ from: backendAddress });

  const receipt = await contract.methods
    .registerProperty(propertyId, owner, price)
    .send({ from: backendAddress, gas: gas.toString() });

  const receiptDocument = await createReceipt(propertyId, owner, receipt);

  return receiptDocument;
}

export async function applyToRent(
  fromAddress: string,
  propertyId: string
): Promise<PropertyDocument> {
  const alreadyApplied = await hasAlreadyApplied(propertyId, fromAddress);
  if (alreadyApplied) {
    throw new Error(
      "An application has already been submitted for this property"
    );
  }

  const property = await getProperty(propertyId);
  const contract = new Contract(PropertyABI.abi, contractAddress, web3);
  const gas = await estimateGas(contract, String(property._id), fromAddress);
  const receipt = await sendTransaction(
    contract,
    String(property._id),
    fromAddress,
    Number(gas.toString())
  );

  const receiptDocument = await createReceipt(propertyId, fromAddress, receipt);
  console.log("receipt", receiptDocument);

  return property;
}

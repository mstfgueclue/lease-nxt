import dotenv from "dotenv";
import { Contract, ContractAbi, TransactionReceipt } from "web3";
import ReceiptModel, { Receipt } from "./ReceiptSchema";
import { TransactionType } from "./types";

dotenv.config();
const backendAddress = process.env.BACKEND_ADDRESS;

export async function getReceipts(propertyId: string) {
  return ReceiptModel.find({ propertyId }).exec();
}

export function mapReceipt(
  propertyId: string,
  from: string,
  receipt: TransactionReceipt,
  transactionType: TransactionType
): Receipt {
  const mappedReceipt: Receipt = {
    propertyId,
    blockNumber: String(receipt.blockNumber),
    transactionHash: String(receipt.transactionHash),
    from: from,
    backendAddress: String(receipt.from),
    smartContractAddress: String(receipt.to),
    gasUsed: Number(receipt.gasUsed.toString()),
    transactionType: transactionType,
  };

  if (transactionType === TransactionType.REQUEST_RENTAL) {
    mappedReceipt.applicationId = String(
      receipt.events?.RentalRequested.returnValues.applicationId
    );
  }

  return mappedReceipt;
}

export async function createReceipt(receipt: Receipt) {
  const receiptDocument = await ReceiptModel.create(receipt);
  if (!receiptDocument) {
    throw new Error("Failed to create receipt");
  }
  return receiptDocument;
}

export async function estimateGas(
  contract: Contract<ContractAbi>,
  propertyId: string,
  fromAddress: string
) {
  const gas = await contract.methods
    .applyToRent(String(propertyId), fromAddress)
    .estimateGas({ from: backendAddress });
  return gas;
}

export async function sendTransaction(
  contract: Contract<ContractAbi>,
  propertyId: string,
  fromAddress: string,
  gas: number
) {
  const receipt = await contract.methods
    .applyToRent(String(propertyId), fromAddress)
    .send({ from: backendAddress, gas: gas.toString() });
  return receipt;
}

// check if user has already applied to rent
export async function hasAlreadyApplied(propertyId: string, from: string) {
  return ReceiptModel.findOne({
    propertyId,
    from,
  }).exec();
}

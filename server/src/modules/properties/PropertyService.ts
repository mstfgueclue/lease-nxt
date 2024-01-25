import { Contract, ContractAbi, Web3 } from "web3";
import dotenv from "dotenv";
import { PropertyABI } from "./types";
import { Property } from "./PropertySchema";

dotenv.config();

const web3 = new Web3(process.env.GANACHE_URL);
const contractAddress = "0x253350cd18f00319896EF1Df07D50bDf619fB77a";

export async function registerProperty(property: Property) {
  const accounts = await web3.eth.getAccounts();
  const contract = new Contract(PropertyABI.abi, contractAddress, web3);
  const receipt = await contract.methods
    .registerProperty(property.title, property.price)
    .send({ from: accounts[0], gas: "200000" });

  console.log(receipt);
}

export async function rentProperty(
  fromAddress: string,
  propertyId: number,
  rentValue: number
) {
  const contract = new Contract(PropertyABI.abi, contractAddress, web3);
  const receipt = await contract.methods
    .rentProperty(propertyId)
    .send({ from: fromAddress, value: String(rentValue) });

  console.log(receipt);
}

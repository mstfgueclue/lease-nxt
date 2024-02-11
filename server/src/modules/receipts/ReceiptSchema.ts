import mongoose, { Schema } from "mongoose";

const ReceiptSchema = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    blockNumber: { type: String, required: true },
    transactionHash: { type: String, required: true },
    from: { type: String, required: true },
    backendAddress: { type: String, required: true },
    smartContractAddress: { type: String, required: true },
    gasUsed: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export interface Receipt {
  propertyId: string;
  blockNumber: string;
  transactionHash: string;
  from: string;
  backendAddress: string;
  smartContractAddress: string;
  gasUsed: number;
}

export interface ReceiptDocument extends Receipt, Document {}

const ReceiptModel = mongoose.model<ReceiptDocument>(
  "Receipt",
  ReceiptSchema,
  "receipts"
);

export default ReceiptModel;

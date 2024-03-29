import mongoose, { Schema } from "mongoose";
import { TransactionType } from "./types";

const ReceiptSchema = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    applicationId: {
      type: String,
    },
    blockNumber: { type: String, required: true },
    transactionHash: { type: String, required: true },
    from: { type: String, required: true },
    backendAddress: { type: String, required: true },
    smartContractAddress: { type: String, required: true },
    gasUsed: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// will come in handy when the property field needs to be populated
ReceiptSchema.pre("save", async function () {
  if (this.propertyId && !this.property) {
    this.property = this.propertyId;
  }
});

export interface Receipt {
  propertyId: string;
  applicationId?: string;
  blockNumber: string;
  transactionHash: string;
  transactionType: TransactionType;
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

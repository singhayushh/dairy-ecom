import { Model, Schema, model } from "mongoose";
import { PaymentMethod, TransactionSchemaDto, TransactionStatus } from "../dtos/transaction.dto";

const transactionSchema: Schema<TransactionSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: "INR",
        },
        razorpayId: {
            type: String,
            required: true,
            unique: true,
        },
        razorpaySignature: String,
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethod),
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(TransactionStatus),
        },
        receiptURL: String,
    },
    {
        timestamps: true,
    }
);

const Transaction: Model<TransactionSchemaDto> = model(
    "Transaction",
    transactionSchema
);

export { Transaction };

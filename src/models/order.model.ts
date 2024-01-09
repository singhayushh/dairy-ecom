import { Model, Schema, model } from "mongoose";
import { OrderSchemaDto, OrderStatus } from "../dtos/order.dto";

const orderSchema: Schema<OrderSchemaDto> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        identifier: {
            type: String,
            required: true,
            unique: true,
        },
        items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: "INR",
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        couponCode: String,
        transactionId: {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
        },
        transactionNumber: Number,
        status: {
            type: "String",
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.AWAITING_PAYMENT,
        },
        trackingId: {
            type: String,
            unique: true,
            required: true,
        },
        deliveryInstructions: String,
        deliveryDate: Date,
        notes: String,
    },
    {
        timestamps: true,
    }
);

const Order: Model<OrderSchemaDto> = model("Order", orderSchema);

export { Order };

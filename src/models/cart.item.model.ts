import { Model, Schema, model } from "mongoose";
import { CartItemSchemaDto } from "../dtos/cart.item.dto";

const cartItemSchema: Schema<CartItemSchemaDto> = new Schema(
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
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        variation: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        pricePerUnit: {
            type: Number,
            required: true,
        },
        subTotal: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: "INR",
        },
    },
    {
        timestamps: true,
    }
);

const CartItem: Model<CartItemSchemaDto> = model("CartItem", cartItemSchema);

export { CartItem };

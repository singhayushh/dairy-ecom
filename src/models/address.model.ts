/*
 * Author: Ayush Singh
 * File: address.model.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Model, Schema, model } from "mongoose";
import { AddressSchemaDto } from "../dtos/address.dto";

const addressSchema: Schema<AddressSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipient: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        fullAddress: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Address: Model<AddressSchemaDto> = model("Address", addressSchema);

export { Address };

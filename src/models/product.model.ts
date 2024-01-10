/*
 * Author: Ayush Singh
 * File: product.model.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Model, Schema, model } from "mongoose";
import { ProductCategory, ProductSchemaDto } from "../dtos/product.dto";

const productSchema: Schema<ProductSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: Object.values(ProductCategory),
            default: ProductCategory.MILK,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        priceList: [
            {
                size: {
                    type: String,
                    required: true,
                },
                variation: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                currency: {
                    type: String,
                    default: "INR",
                },
            },
        ],
        isAvailable: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product: Model<ProductSchemaDto> = model("Product", productSchema);

export { Product };

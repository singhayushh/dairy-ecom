/*
 * Author: Ayush Singh
 * File: asset.model.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Model, Schema, model } from "mongoose";
import { AssetSchemaDto, AssetType } from "../dtos/asset.dto";

const assetSchema: Schema<AssetSchemaDto> = new Schema(
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
        type: {
            type: String,
            required: true,
            enum: Object.values(AssetType),
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            unique: true,
            required: true,
        },
        metadata: {
            filename: String,
            size: Number,
            format: String,
        },
    },
    {
        timestamps: true,
    }
);

const Asset: Model<AssetSchemaDto> = model("Asset", assetSchema);

export { Asset };

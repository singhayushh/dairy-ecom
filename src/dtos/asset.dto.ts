/*
 * Author: Ayush Singh
 * File: asset.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document, Schema, Types } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing an asset.
 */
type AssetDto = {
    /**
     * Unique identifier for the asset.
     */
    slug: string;

    /**
     * User ID associated with this address.
     */
    by: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Type of the asset.
     */
    type: AssetType;

    /**
     * Title of the asset.
     */
    title: string;

    /**
     * URL pointing to the asset.
     */
    url: string;

    /**
     * Metadata associated with the asset.
     */
    metadata: {
        /**
         * Filename of the asset.
         */
        filename: string;

        /**
         * Size of the asset in bytes.
         */
        size: number;

        /**
         * Format of the asset.
         */
        format: string;
    };
};

/**
 * Enumeration representing different types of assets.
 */
enum AssetType {
    /**
     * Image asset type.
     */
    IMAGE = "Image",

    /**
     * Video asset type.
     */
    VIDEO = "Video",
}

/**
 * Partial data transfer object for updating an asset.
 */
type AssetUpdateDto = Partial<AssetDto>;

/**
 * Schema data transfer object representing an asset with mongoose Document.
 */
type AssetSchemaDto = Document & AssetDto;

/**
 * Data transfer object for pagination of assets.
 */
type AssetPaginationDto = {
    /**
     * Array of assets.
     */
    assets: AssetSchemaDto[];
} & PaginationDto;

export {
    AssetDto,
    AssetPaginationDto,
    AssetSchemaDto,
    AssetType,
    AssetUpdateDto,
};

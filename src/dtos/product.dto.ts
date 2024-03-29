/*
 * Author: Ayush Singh
 * File: product.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing a product.
 */
type ProductDto = {
    /**
     * Unique identifier for the product.
     */
    slug: string;

    /**
     * Product code for identification.
     */
    code: string;

    /**
     * Name of the product.
     */
    name: string;

    /**
     * Category to which the product belongs.
     */
    category: ProductCategory;

    /**
     * Description providing details about the product.
     */
    description: string;

    /**
     * Content or specifications of the product.
     */
    content: string;

    /**
     * URL for the thumbnail image of the product.
     */
    thumbnail: string;

    /**
     * Price list containing size, variation, price, and currency information.
     */
    priceList: PriceList[];

    /**
     * Indicates whether the product is currently available.
     */
    isAvailable: boolean;
};

/**
 * Represents a price entry in the price list of a product.
 */
type PriceList = {
    /**
     * Size of the product.
     */
    size: string;

    /**
     * Variation of the product.
     */
    variation: string;

    /**
     * Price of the product for the specified size and variation.
     */
    price: number;

    /**
     * Currency in which the price is specified.
     */
    currency: string;
};

/**
 * Partial data transfer object for updating a product.
 */
type ProductUpdateDto = Partial<ProductDto>;

/**
 * Schema data transfer object representing a product with mongoose Document.
 */
type ProductSchemaDto = Document & ProductDto;

/**
 * Data transfer object for pagination of products.
 */
type ProductPaginationDto = {
    /**
     * Array of products.
     */
    products: ProductSchemaDto[];
} & PaginationDto;

/**
 * Enumeration representing different product categories.
 */
enum ProductCategory {
    MILK = "Milk",
    BUTTER = "Butter",
    CREAM = "Cream",
    GHEE = "Ghee",
    OTHERS = "Others",
}

export {
    ProductCategory,
    ProductDto,
    ProductPaginationDto,
    ProductSchemaDto,
    ProductUpdateDto,
};

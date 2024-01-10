/*
 * Author: Ayush Singh
 * File: product.service.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { randomBytes } from "crypto";
import {
    ProductDto,
    ProductSchemaDto,
    ProductUpdateDto,
} from "../dtos/product.dto";
import { Types } from "mongoose";
import * as productRepository from "../repositories/product.repo";
import slug from "slug";

/**
 * Creates a new product.
 *
 * @param dto - ProductDto containing product details.
 * @param user - User identifier associated with the product.
 * @returns Promise<ProductSchemaDto> - Created product.
 */
const createProduct = (
    dto: ProductDto,
    user: Types.ObjectId
): Promise<ProductSchemaDto> => {
    // Generate a unique slug for the product using random bytes
    dto.slug = slug(dto.name).toLowerCase() + randomBytes(3).toString("hex");

    // Assign the user identifier to the 'by' field in the product
    dto.code = dto.slug.toUpperCase();

    // Call the repository function to create the product
    return productRepository.create(dto);
};

/**
 * Deletes an product based on its slug.
 *
 * @param slug - Unique identifier for the product.
 * @returns Promise<ProductSchemaDto | null> - Deleted product or null if not found.
 */
const deleteProduct = async (
    slug: string
): Promise<ProductSchemaDto | null> => {
    // Find the product by its slug
    const product = await productRepository.findOneBySlug(slug);

    // If the product is not found, return null
    if (!product) return null;

    // Call the repository function to delete the product
    return productRepository.deleteOne(product._id);
};

/**
 * Fetches all productes associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<ProductSchemaDto[]> - List of productes.
 */
const fetchAllProduct = async (
    user?: Types.ObjectId
): Promise<ProductSchemaDto[]> => {
    // Call the repository function to find all productes for the user
    return productRepository.find(user);
};

/**
 * Fetches an product based on its slug.
 *
 * @param slug - Unique identifier for the product.
 * @returns Promise<ProductSchemaDto | null> - Found product or null if not found.
 */
const fetchProduct = async (slug: string): Promise<ProductSchemaDto | null> => {
    // Call the repository function to find the product by its slug
    return productRepository.findOneBySlug(slug);
};

/**
 * Updates an product based on its slug.
 *
 * @param slug - Unique identifier for the product.
 * @param dto - ProductUpdateDto containing updated product details.
 * @returns Promise<ProductSchemaDto | null> - Updated product or null if not found.
 */
const updateProduct = async (
    slug: string,
    dto: ProductUpdateDto
): Promise<ProductSchemaDto | null> => {
    // Find the product by its slug
    const product = await productRepository.findOneBySlug(slug);

    // If the product is not found, return null
    if (!product) return null;

    // Call the repository function to update the product
    return productRepository.updateOne(product._id, dto);
};

export {
    createProduct,
    deleteProduct,
    fetchProduct,
    fetchAllProduct,
    updateProduct,
};

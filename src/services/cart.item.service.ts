/*
 * Author: Ayush Singh
 * File: cart.item.service.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { randomBytes } from "crypto";
import {
    CartItemDto,
    CartItemSchemaDto,
    CartItemUpdateDto,
} from "../dtos/cart.item.dto";
import { Types } from "mongoose";
import * as cartItemRepository from "../repositories/cart.item.repo";

/**
 * Creates a new cartItem.
 *
 * @param dto - CartItemDto containing cartItem details.
 * @param user - User identifier associated with the cartItem.
 * @returns Promise<CartItemSchemaDto> - Created cartItem.
 */
const createCartItem = (
    dto: CartItemDto,
    user: Types.ObjectId
): Promise<CartItemSchemaDto> => {
    // Generate a unique slug for the cartItem using random bytes
    dto.slug = randomBytes(3).toString("hex");

    // Assign the user identifier to the 'by' field in the cartItem
    dto.user = user;

    // Call the repository function to create the cartItem
    return cartItemRepository.create(dto);
};

/**
 * Deletes an cartItem based on its slug.
 *
 * @param slug - Unique identifier for the cartItem.
 * @returns Promise<CartItemSchemaDto | null> - Deleted cartItem or null if not found.
 */
const deleteCartItem = async (
    slug: string
): Promise<CartItemSchemaDto | null> => {
    // Find the cartItem by its slug
    const cartItem = await cartItemRepository.findOneBySlug(slug);

    // If the cartItem is not found, return null
    if (!cartItem) return null;

    // Call the repository function to delete the cartItem
    return cartItemRepository.deleteOne(cartItem._id);
};

/**
 * Fetches all cartItemes associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<CartItemSchemaDto[]> - List of cartItemes.
 */
const fetchAllCartItem = async (
    user?: Types.ObjectId
): Promise<CartItemSchemaDto[]> => {
    // Call the repository function to find all cartItemes for the user
    return cartItemRepository.find(user);
};

/**
 * Fetches an cartItem based on its slug.
 *
 * @param slug - Unique identifier for the cartItem.
 * @returns Promise<CartItemSchemaDto | null> - Found cartItem or null if not found.
 */
const fetchCartItem = async (
    slug: string
): Promise<CartItemSchemaDto | null> => {
    // Call the repository function to find the cartItem by its slug
    return cartItemRepository.findOneBySlug(slug);
};

/**
 * Updates an cartItem based on its slug.
 *
 * @param slug - Unique identifier for the cartItem.
 * @param dto - CartItemUpdateDto containing updated cartItem details.
 * @returns Promise<CartItemSchemaDto | null> - Updated cartItem or null if not found.
 */
const updateCartItem = async (
    slug: string,
    dto: CartItemUpdateDto
): Promise<CartItemSchemaDto | null> => {
    // Find the cartItem by its slug
    const cartItem = await cartItemRepository.findOneBySlug(slug);

    // If the cartItem is not found, return null
    if (!cartItem) return null;

    // Call the repository function to update the cartItem
    return cartItemRepository.updateOne(cartItem._id, dto);
};

export {
    createCartItem,
    deleteCartItem,
    fetchCartItem,
    fetchAllCartItem,
    updateCartItem,
};

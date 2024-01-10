/*
 * Author: Ayush Singh
 * File: cart.item.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document, Types, Schema } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing a cart item.
 */
type CartItemDto = {
    /**
     * Unique identifier for the cartItem.
     */
    slug: string;

    /**
     * User associated with the cart item.
     */
    user: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Product associated with the cart item.
     */
    product: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Size of the product in the cart item.
     */
    size: string;

    /**
     * Variation of the product in the cart item.
     */
    variation: string;

    /**
     * Quantity of the product in the cart item.
     */
    quantity: number;

    /**
     * Price per unit of the product in the cart item.
     */
    pricePerUnit: number;

    /**
     * Subtotal for the cart item (quantity * pricePerUnit).
     */
    subTotal: number;

    /**
     * Currency used for the cart item.
     */
    currency: string;
};

/**
 * Partial data transfer object for updating a cart item.
 */
type CartItemUpdateDto = Partial<CartItemDto>;

/**
 * Schema data transfer object representing a cart item with mongoose Document.
 */
type CartItemSchemaDto = Document & CartItemDto;

/**
 * Data transfer object for pagination of cart items.
 */
type CartItemPaginationDto = {
    /**
     * Array of cart items.
     */
    cartItems: CartItemSchemaDto[];
} & PaginationDto;

export {
    CartItemDto,
    CartItemPaginationDto,
    CartItemSchemaDto,
    CartItemUpdateDto,
};

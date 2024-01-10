/*
 * Author: Ayush Singh
 * File: order.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document, Schema, Types } from "mongoose";
import { CartItemDto } from "./cart.item.dto";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing an order.
 */
type OrderDto = {
    /**
     * User associated with the order.
     */
    user: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Unique identifier for the order.
     */
    identifier: string;

    /**
     * Items included in the order.
     */
    items: CartItemDto[];

    /**
     * Total amount for the order.
     */
    amount: number;

    /**
     * Currency used for the order.
     */
    currency: string;

    /**
     * Address associated with the order.
     */
    address: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Optional coupon code applied to the order.
     */
    couponCode?: string;

    /**
     * ID of the transaction related to the order.
     */
    transactionId?: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Transaction number associated with the order.
     */
    transactionNumber?: number;

    /**
     * Current status of the order.
     */
    status: OrderStatus;

    /**
     * Tracking ID for the order.
     */
    trackingId: string;

    /**
     * Delivery instructions for the order.
     */
    deliveryInstructions?: string;

    /**
     * Expected delivery date for the order.
     */
    deliveryDate?: Date;

    /**
     * Additional notes for the order.
     */
    notes?: string;
};

/**
 * Enumeration representing different order statuses.
 */
enum OrderStatus {
    /**
     * Order is awaiting payment.
     */
    AWAITING_PAYMENT = "Awaiting Payment",

    /**
     * Order is pending.
     */
    PENDING = "Pending",

    /**
     * Order is being processed.
     */
    PROCESSING = "Processing",

    /**
     * Order has been shipped.
     */
    SHIPPED = "Shipped",

    /**
     * Order is out for delivery.
     */
    OUT_FOR_DELIVERY = "Out for Delivery",

    /**
     * Order has been delivered.
     */
    DELIVERED = "Delivered",

    /**
     * Order has been cancelled.
     */
    CANCELLED = "Cancelled",

    /**
     * Order has been refunded.
     */
    REFUNDED = "Refunded",

    /**
     * Order is on hold.
     */
    ON_HOLD = "On Hold",

    /**
     * Order has been returned.
     */
    RETURNED = "Returned",

    /**
     * Order is completed.
     */
    COMPLETED = "Completed",
}

/**
 * Partial data transfer object for updating an order.
 */
type OrderUpdateDto = Partial<OrderDto>;

/**
 * Schema data transfer object representing an order with mongoose Document.
 */
type OrderSchemaDto = Document & OrderDto;

/**
 * Data transfer object for pagination of orders.
 */
type OrderPaginationDto = {
    /**
     * Array of orders.
     */
    orders: OrderSchemaDto[];
} & PaginationDto;

export {
    OrderDto,
    OrderPaginationDto,
    OrderSchemaDto,
    OrderStatus,
    OrderUpdateDto,
};

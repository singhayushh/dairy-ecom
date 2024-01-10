/*
 * Author: Ayush Singh
 * File: transaction.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document, Schema, Types } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing a transaction.
 */
type TransactionDto = {
    /**
     * Unique identifier for the asset.
     */
    slug: string;

    /**
     * User associated with the transaction.
     */
    user: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Order associated with the transaction.
     */
    order: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Unique number identifying the transaction.
     */
    number: number;

    /**
     * Amount of the transaction.
     */
    amount: number;

    /**
     * Currency used for the transaction.
     */
    currency: string;

    /**
     * Identifier from the Razorpay payment gateway.
     */
    razorpayId: string;

    /**
     * Optional signature from Razorpay for added security.
     */
    razorpaySignature?: string;

    /**
     * Payment method used for the transaction.
     */
    paymentMethod?: PaymentMethod;

    /**
     * Current status of the transaction.
     */
    status: TransactionStatus;

    /**
     * URL of the receipt associated with the transaction.
     */
    receiptURL?: string;
};

/**
 * Enumeration representing different payment methods.
 */
enum PaymentMethod {
    /**
     * Credit card payment method.
     */
    CARD = "Card",

    /**
     * Debit card payment method.
     */
    DEBIT = "Debit",

    /**
     * Credit card payment method.
     */
    CREDIT = "Credit",

    /**
     * Netbanking payment method.
     */
    NETBANKING = "Netbanking",

    /**
     * UPI (Unified Payments Interface) payment method.
     */
    UPI = "UPI",

    /**
     * Wallet payment method.
     */
    WALLET = "Wallet",
}

/**
 * Enumeration representing different transaction statuses.
 */
enum TransactionStatus {
    /**
     * Order has been created.
     */
    CREATED = "Created",

    /**
     * Order has been authorized.
     */
    AUTHORIZED = "Authorized",

    /**
     * Order has been captured.
     */
    CAPTURED = "Captured",

    /**
     * Order has been refunded.
     */
    REFUNDED = "Refunded",

    /**
     * Order has failed.
     */
    FAILED = "Failed",
}

/**
 * Partial data transfer object for updating a transaction.
 */
type TransactionUpdateDto = Partial<TransactionDto>;

/**
 * Schema data transfer object representing a transaction with mongoose Document.
 */
type TransactionSchemaDto = Document & TransactionDto;

/**
 * Data transfer object for pagination of transactions.
 */
type TransactionPaginationDto = {
    /**
     * Array of transactions.
     */
    transactions: TransactionSchemaDto[];
} & PaginationDto;

export {
    TransactionStatus,
    PaymentMethod,
    TransactionDto,
    TransactionPaginationDto,
    TransactionSchemaDto,
    TransactionUpdateDto,
};

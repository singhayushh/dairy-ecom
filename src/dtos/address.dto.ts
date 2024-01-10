/*
 * Author: Ayush Singh
 * File: address.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document, Schema, Types } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing an address.
 */
type AddressDto = {
    /**
     * Unique identifier for the address.
     */
    slug: string;

    /**
     * User ID associated with this address.
     */
    by: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Name of the recipient at this address.
     */
    recipient: string;

    /**
     * House or building number.
     */
    houseNumber: string;

    /**
     * Street name.
     */
    street: string;

    /**
     * City name.
     */
    city: string;

    /**
     * State or region name.
     */
    state: string;

    /**
     * Country name.
     */
    country: string;

    /**
     * Full formatted address.
     */
    fullAddress: string;
};

/**
 * Partial data transfer object for updating an address.
 */
type AddressUpdateDto = Partial<AddressDto>;

/**
 * Schema data transfer object representing an address with mongoose Document.
 */
type AddressSchemaDto = Document & AddressDto;

/**
 * Data transfer object for pagination of addresses.
 */
type AddressPaginationDto = {
    /**
     * Array of addresses.
     */
    addresses: AddressSchemaDto[];
} & PaginationDto;

export { AddressDto, AddressPaginationDto, AddressSchemaDto, AddressUpdateDto };

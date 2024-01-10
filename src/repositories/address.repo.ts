/*
 * Author: Ayush Singh
 * File: address.repo.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Types } from "mongoose";
import {
    AddressDto,
    AddressSchemaDto,
    AddressUpdateDto,
} from "../dtos/address.dto";
import { Address } from "../models/address.model";

/**
 * create function creates a new address document and returns it
 *
 * @param {AddressDto} createAddressDto the address object to be added to the db
 * @returns  {Promise<AddressSchemaDto>} the created address document
 */
const create = async (
    createAddressDto: AddressDto
): Promise<AddressSchemaDto> => {
    return Address.create(createAddressDto);
};

/**
 * deleteOne function deletes a single address from the db by given id and returns the deleted address
 *
 * @param {Types.ObjectId} id the object id of the address
 * @returns  {(Promise<AddressSchemaDto | null>)} the deleted address document or null for incorrect id
 */
const deleteOne = async (
    id: Types.ObjectId
): Promise<AddressSchemaDto | null> => {
    return Address.findOneAndDelete({ _id: id }).lean();
};

/**
 * find function returns a list of address documents for pagination by its caller
 *
 * @returns  {Promise<AddressSchemaDto[]>} Array of address documents
 */
const find = async (userId?: Types.ObjectId): Promise<AddressSchemaDto[]> => {
    if (userId)
        return Address.find({ by: userId }).sort({ createdAt: 1 }).lean();
    return Address.find().sort({ createdAt: 1 }).lean();
};

/**
 * findOne function returns a single address document by given id
 *
 * @param {Types.ObjectId} id object id of the address
 * @returns  {(Promise<AddressSchemaDto | null>)} the address document or null if id not present
 */
const findOne = async (
    id: Types.ObjectId
): Promise<AddressSchemaDto | null> => {
    return Address.findById(id).lean();
};

/**
 * findOneBySlug function returns a single address document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the address
 * @returns  {(Promise<AddressSchemaDto | null>)} the address document or null if slug not present
 */
const findOneBySlug = async (
    slug: string
): Promise<AddressSchemaDto | null> => {
    return Address.findOne({ slug }).lean();
};

/**
 * updateOne function updates the address document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the address to be updated
 * @param {UpdateAddressDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<AddressSchemaDto | null>)} the updated address document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: AddressUpdateDto
): Promise<AddressSchemaDto | null> => {
    return Address.findOneAndUpdate({ _id: id }, dto, { new: true }).lean();
};

export { create, deleteOne, find, findOne, findOneBySlug, updateOne };

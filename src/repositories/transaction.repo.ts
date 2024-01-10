/*
 * Author: Ayush Singh
 * File: transaction.repo.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Types } from "mongoose";
import {
    TransactionDto,
    TransactionSchemaDto,
    TransactionUpdateDto,
} from "../dtos/transaction.dto";
import { Transaction } from "../models/transaction.model";

/**
 * create function creates a new transaction document and returns it
 *
 * @param {TransactionDto} createTransactionDto the transaction object to be added to the db
 * @returns  {Promise<TransactionSchemaDto>} the created transaction document
 */
const create = async (
    createTransactionDto: TransactionDto
): Promise<TransactionSchemaDto> => {
    return Transaction.create(createTransactionDto);
};

/**
 * deleteOne function deletes a single transaction from the db by given id and returns the deleted transaction
 *
 * @param {Types.ObjectId} id the object id of the transaction
 * @returns  {(Promise<TransactionSchemaDto | null>)} the deleted transaction document or null for incorrect id
 */
const deleteOne = async (
    id: Types.ObjectId
): Promise<TransactionSchemaDto | null> => {
    return Transaction.findOneAndDelete({ _id: id }).lean();
};

/**
 * find function returns a list of transaction documents for pagination by its caller
 *
 * @returns  {Promise<TransactionSchemaDto[]>} Array of transaction documents
 */
const find = async (
    userId?: Types.ObjectId
): Promise<TransactionSchemaDto[]> => {
    if (userId)
        return Transaction.find({ by: userId }).sort({ createdAt: 1 }).lean();
    return Transaction.find().sort({ createdAt: 1 }).lean();
};

/**
 * findOne function returns a single transaction document by given id
 *
 * @param {Types.ObjectId} id object id of the transaction
 * @returns  {(Promise<TransactionSchemaDto | null>)} the transaction document or null if id not present
 */
const findOne = async (
    id: Types.ObjectId
): Promise<TransactionSchemaDto | null> => {
    return Transaction.findById(id).lean();
};

/**
 * findOneBySlug function returns a single transaction document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the transaction
 * @returns  {(Promise<TransactionSchemaDto | null>)} the transaction document or null if slug not present
 */
const findOneBySlug = async (
    slug: string
): Promise<TransactionSchemaDto | null> => {
    return Transaction.findOne({ slug }).lean();
};

/**
 * updateOne function updates the transaction document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the transaction to be updated
 * @param {UpdateTransactionDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<TransactionSchemaDto | null>)} the updated transaction document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: TransactionUpdateDto
): Promise<TransactionSchemaDto | null> => {
    return Transaction.findOneAndUpdate({ _id: id }, dto, { new: true }).lean();
};

export { create, deleteOne, find, findOne, findOneBySlug, updateOne };

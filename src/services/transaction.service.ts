import { randomBytes } from 'crypto';
import { TransactionDto, TransactionSchemaDto, TransactionUpdateDto } from '../dtos/transaction.dto';
import { Types } from 'mongoose';
import * as transactionRepository from '../repositories/transaction.repo';
import slug from 'slug';

/**
 * Creates a new transaction.
 *
 * @param dto - TransactionDto containing transaction details.
 * @param user - User identifier associated with the transaction.
 * @returns Promise<TransactionSchemaDto> - Created transaction.
 */
const createTransaction = (dto: TransactionDto, user: Types.ObjectId): Promise<TransactionSchemaDto> => {
  // Generate a unique slug for the transaction using random bytes
  dto.slug = randomBytes(3).toString("hex");
  
  // Assign the user identifier to the 'by' field in the transaction
  dto.user = user;

  // Call the repository function to create the transaction
  return transactionRepository.create(dto);
};

/**
 * Deletes an transaction based on its slug.
 *
 * @param slug - Unique identifier for the transaction.
 * @returns Promise<TransactionSchemaDto | null> - Deleted transaction or null if not found.
 */
const deleteTransaction = async (slug: string): Promise<TransactionSchemaDto | null> => {
  // Find the transaction by its slug
  const transaction = await transactionRepository.findOneBySlug(slug);

  // If the transaction is not found, return null
  if (!transaction) return null;

  // Call the repository function to delete the transaction
  return transactionRepository.deleteOne(transaction._id);
};

/**
 * Fetches all transactiones associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<TransactionSchemaDto[]> - List of transactiones.
 */
const fetchAllTransaction = async (user?: Types.ObjectId): Promise<TransactionSchemaDto[]> => {
  // Call the repository function to find all transactiones for the user
  return transactionRepository.find(user);
};

/**
 * Fetches an transaction based on its slug.
 *
 * @param slug - Unique identifier for the transaction.
 * @returns Promise<TransactionSchemaDto | null> - Found transaction or null if not found.
 */
const fetchTransaction = async (slug: string): Promise<TransactionSchemaDto | null> => {
  // Call the repository function to find the transaction by its slug
  return transactionRepository.findOneBySlug(slug);
};

/**
 * Updates an transaction based on its slug.
 *
 * @param slug - Unique identifier for the transaction.
 * @param dto - TransactionUpdateDto containing updated transaction details.
 * @returns Promise<TransactionSchemaDto | null> - Updated transaction or null if not found.
 */
const updateTransaction = async (slug: string, dto: TransactionUpdateDto): Promise<TransactionSchemaDto | null> => {
  // Find the transaction by its slug
  const transaction = await transactionRepository.findOneBySlug(slug);

  // If the transaction is not found, return null
  if (!transaction) return null;

  // Call the repository function to update the transaction
  return transactionRepository.updateOne(transaction._id, dto);
};

export {
  createTransaction,
  deleteTransaction,
  fetchTransaction,
  fetchAllTransaction,
  updateTransaction,
};

import { randomBytes } from 'crypto';
import { AddressDto, AddressSchemaDto, AddressUpdateDto } from '../dtos/address.dto';
import { Types } from 'mongoose';
import * as addressRepository from '../repositories/address.repo';

/**
 * Creates a new address.
 *
 * @param dto - AddressDto containing address details.
 * @param user - User identifier associated with the address.
 * @returns Promise<AddressSchemaDto> - Created address.
 */
const createAddress = (dto: AddressDto, user: Types.ObjectId): Promise<AddressSchemaDto> => {
  // Generate a unique slug for the address using random bytes
  dto.slug = randomBytes(3).toString("hex");
  
  // Assign the user identifier to the 'by' field in the address
  dto.by = user;

  // Call the repository function to create the address
  return addressRepository.create(dto);
};

/**
 * Deletes an address based on its slug.
 *
 * @param slug - Unique identifier for the address.
 * @returns Promise<AddressSchemaDto | null> - Deleted address or null if not found.
 */
const deleteAddress = async (slug: string): Promise<AddressSchemaDto | null> => {
  // Find the address by its slug
  const address = await addressRepository.findOneBySlug(slug);

  // If the address is not found, return null
  if (!address) return null;

  // Call the repository function to delete the address
  return addressRepository.deleteOne(address._id);
};

/**
 * Fetches all addresses associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<AddressSchemaDto[]> - List of addresses.
 */
const fetchAllAddress = async (user?: Types.ObjectId): Promise<AddressSchemaDto[]> => {
  // Call the repository function to find all addresses for the user
  return addressRepository.find(user);
};

/**
 * Fetches an address based on its slug.
 *
 * @param slug - Unique identifier for the address.
 * @returns Promise<AddressSchemaDto | null> - Found address or null if not found.
 */
const fetchAddress = async (slug: string): Promise<AddressSchemaDto | null> => {
  // Call the repository function to find the address by its slug
  return addressRepository.findOneBySlug(slug);
};

/**
 * Updates an address based on its slug.
 *
 * @param slug - Unique identifier for the address.
 * @param dto - AddressUpdateDto containing updated address details.
 * @returns Promise<AddressSchemaDto | null> - Updated address or null if not found.
 */
const updateAddress = async (slug: string, dto: AddressUpdateDto): Promise<AddressSchemaDto | null> => {
  // Find the address by its slug
  const address = await addressRepository.findOneBySlug(slug);

  // If the address is not found, return null
  if (!address) return null;

  // Call the repository function to update the address
  return addressRepository.updateOne(address._id, dto);
};

export {
  createAddress,
  deleteAddress,
  fetchAddress,
  fetchAllAddress,
  updateAddress,
};

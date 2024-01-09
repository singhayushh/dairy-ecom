import { randomBytes } from 'crypto';
import { AssetDto, AssetSchemaDto, AssetUpdateDto } from '../dtos/asset.dto';
import { Types } from 'mongoose';
import * as assetRepository from '../repositories/asset.repo';

/**
 * Creates a new asset.
 *
 * @param dto - AssetDto containing asset details.
 * @param user - User identifier associated with the asset.
 * @returns Promise<AssetSchemaDto> - Created asset.
 */
const createAsset = (dto: AssetDto, user: Types.ObjectId): Promise<AssetSchemaDto> => {
  // Generate a unique slug for the asset using random bytes
  dto.slug = randomBytes(3).toString("hex");
  
  // Assign the user identifier to the 'by' field in the asset
  dto.by = user;

  // Call the repository function to create the asset
  return assetRepository.create(dto);
};

/**
 * Deletes an asset based on its slug.
 *
 * @param slug - Unique identifier for the asset.
 * @returns Promise<AssetSchemaDto | null> - Deleted asset or null if not found.
 */
const deleteAsset = async (slug: string): Promise<AssetSchemaDto | null> => {
  // Find the asset by its slug
  const asset = await assetRepository.findOneBySlug(slug);

  // If the asset is not found, return null
  if (!asset) return null;

  // Call the repository function to delete the asset
  return assetRepository.deleteOne(asset._id);
};

/**
 * Fetches all assetes associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<AssetSchemaDto[]> - List of assetes.
 */
const fetchAllAsset = async (user?: Types.ObjectId): Promise<AssetSchemaDto[]> => {
  // Call the repository function to find all assetes for the user
  return assetRepository.find(user);
};

/**
 * Fetches an asset based on its slug.
 *
 * @param slug - Unique identifier for the asset.
 * @returns Promise<AssetSchemaDto | null> - Found asset or null if not found.
 */
const fetchAsset = async (slug: string): Promise<AssetSchemaDto | null> => {
  // Call the repository function to find the asset by its slug
  return assetRepository.findOneBySlug(slug);
};

/**
 * Updates an asset based on its slug.
 *
 * @param slug - Unique identifier for the asset.
 * @param dto - AssetUpdateDto containing updated asset details.
 * @returns Promise<AssetSchemaDto | null> - Updated asset or null if not found.
 */
const updateAsset = async (slug: string, dto: AssetUpdateDto): Promise<AssetSchemaDto | null> => {
  // Find the asset by its slug
  const asset = await assetRepository.findOneBySlug(slug);

  // If the asset is not found, return null
  if (!asset) return null;

  // Call the repository function to update the asset
  return assetRepository.updateOne(asset._id, dto);
};

export {
  createAsset,
  deleteAsset,
  fetchAsset,
  fetchAllAsset,
  updateAsset,
};

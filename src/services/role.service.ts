import { randomBytes } from 'crypto';
import { RoleDto, RoleSchemaDto, RoleUpdateDto } from '../dtos/role.dto';
import * as roleRepository from '../repositories/role.repo';
import { Types } from 'mongoose';

/**
 * Creates a new role.
 *
 * @param dto - RoleDto containing role details.
 * @param user - User identifier associated with the role.
 * @returns Promise<RoleSchemaDto> - Created role.
 */
const createRole = (dto: RoleDto): Promise<RoleSchemaDto> => {
  // Generate a unique slug for the role using random bytes
  dto.slug = randomBytes(3).toString('hex');

  // Call the repository function to create the role
  return roleRepository.create(dto);
};

/**
 * Deletes an role based on its slug.
 *
 * @param slug - Unique identifier for the role.
 * @returns Promise<RoleSchemaDto | null> - Deleted role or null if not found.
 */
const deleteRole = async (slug: string): Promise<RoleSchemaDto | null> => {
  // Find the role by its slug
  const role = await roleRepository.findOneBySlug(slug);

  // If the role is not found, return null
  if (!role) return null;

  // Call the repository function to delete the role
  return roleRepository.deleteOne(role._id);
};

/**
 * Fetches all rolees associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<RoleSchemaDto[]> - List of rolees.
 */
const fetchAllRole = async (): Promise<RoleSchemaDto[]> => {
  // Call the repository function to find all rolees for the user
  return roleRepository.find();
};

/**
 * Fetches an role based on its slug.
 *
 * @param slug - Unique identifier for the role.
 * @returns Promise<RoleSchemaDto | null> - Found role or null if not found.
 */
const fetchRole = async (slug: string): Promise<RoleSchemaDto | null> => {
  // Call the repository function to find the role by its slug
  return roleRepository.findOneBySlug(slug);
};

/**
 * Fetches an role based on its id.
 *
 * @param id - Unique identifier for the role.
 * @returns Promise<RoleSchemaDto | null> - Found role or null if not found.
 */
const fetchRoleById = async (id: Types.ObjectId): Promise<RoleSchemaDto | null> => {
  // Call the repository function to find the role by its slug
  return roleRepository.findOne(id);
};

/**
 * Updates an role based on its slug.
 *
 * @param slug - Unique identifier for the role.
 * @param dto - RoleUpdateDto containing updated role details.
 * @returns Promise<RoleSchemaDto | null> - Updated role or null if not found.
 */
const updateRole = async (slug: string, dto: RoleUpdateDto): Promise<RoleSchemaDto | null> => {
  // Find the role by its slug
  const role = await roleRepository.findOneBySlug(slug);

  // If the role is not found, return null
  if (!role) return null;

  // Call the repository function to update the role
  return roleRepository.updateOne(role._id, dto);
};

export {
  createRole,
  deleteRole,
  fetchRole,
  fetchRoleById,
  fetchAllRole,
  updateRole,
};

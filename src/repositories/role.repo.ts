/*
 * Author: Ayush Singh
 * File: role.repo.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Types } from "mongoose";
import { RoleDto, RoleSchemaDto, RoleUpdateDto } from "../dtos/role.dto";
import { Role } from "../models/role.model";

/**
 * create function creates a new role document and returns it
 *
 * @param {RoleDto} createRoleDto the role object to be added to the db
 * @returns  {Promise<RoleSchemaDto>} the created role document
 */
const create = async (createRoleDto: RoleDto): Promise<RoleSchemaDto> => {
    return Role.create(createRoleDto);
};

/**
 * deleteOne function deletes a single role from the db by given id and returns the deleted role
 *
 * @param {Types.ObjectId} id the object id of the role
 * @returns  {(Promise<RoleSchemaDto | null>)} the deleted role document or null for incorrect id
 */
const deleteOne = async (id: Types.ObjectId): Promise<RoleSchemaDto | null> => {
    return Role.findOneAndDelete({ _id: id }).lean();
};

/**
 * find function returns a list of role documents for pagination by its caller
 *
 * @returns  {Promise<RoleSchemaDto[]>} Array of role documents
 */
const find = async (userId?: Types.ObjectId): Promise<RoleSchemaDto[]> => {
    if (userId) return Role.find({ by: userId }).sort({ createdAt: 1 });
    return Role.find().sort({ createdAt: 1 }).lean();
};

/**
 * findOne function returns a single role document by given id
 *
 * @param {Types.ObjectId} id object id of the role
 * @returns  {(Promise<RoleSchemaDto | null>)} the role document or null if id not present
 */
const findOne = async (id: Types.ObjectId): Promise<RoleSchemaDto | null> => {
    return Role.findById(id).lean();
};

/**
 * findOneBySlug function returns a single role document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the role
 * @returns  {(Promise<RoleSchemaDto | null>)} the role document or null if slug not present
 */
const findOneBySlug = async (slug: string): Promise<RoleSchemaDto | null> => {
    return Role.findOne({ slug }).lean();
};

/**
 * updateOne function updates the role document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the role to be updated
 * @param {UpdateRoleDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<RoleSchemaDto | null>)} the updated role document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: RoleUpdateDto
): Promise<RoleSchemaDto | null> => {
    return Role.findOneAndUpdate({ _id: id }, dto, { new: true }).lean();
};

export { create, deleteOne, find, findOne, findOneBySlug, updateOne };

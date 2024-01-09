import { Types } from "mongoose";
import {
    AssetDto,
    AssetSchemaDto,
    AssetUpdateDto,
} from "../dtos/asset.dto";
import { Asset } from "../models/asset.model";

/**
 * create function creates a new asset document and returns it
 *
 * @param {AssetDto} createAssetDto the asset object to be added to the db
 * @returns  {Promise<AssetSchemaDto>} the created asset document
 */
const create = async (
    createAssetDto: AssetDto
): Promise<AssetSchemaDto> => {
    return Asset.create(createAssetDto);
};

/**
 * deleteOne function deletes a single asset from the db by given id and returns the deleted asset
 *
 * @param {Types.ObjectId} id the object id of the asset
 * @returns  {(Promise<AssetSchemaDto | null>)} the deleted asset document or null for incorrect id
 */
const deleteOne = async (
    id: Types.ObjectId
): Promise<AssetSchemaDto | null> => {
    return Asset.findOneAndDelete({ _id: id });
};

/**
 * find function returns a list of asset documents for pagination by its caller
 *
 * @returns  {Promise<AssetSchemaDto[]>} Array of asset documents
 */
const find = async (
    userId?: Types.ObjectId
): Promise<AssetSchemaDto[]> => {
    if (userId) return Asset.find({ by: userId }).sort({ createdAt: 1 });
    return Asset.find().sort({ createdAt: 1 });
};

/**
 * findOne function returns a single asset document by given id
 *
 * @param {Types.ObjectId} id object id of the asset
 * @returns  {(Promise<AssetSchemaDto | null>)} the asset document or null if id not present
 */
const findOne = async (
    id: Types.ObjectId
): Promise<AssetSchemaDto | null> => {
    return Asset.findById(id);
};

/**
 * findOneBySlug function returns a single asset document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the asset
 * @returns  {(Promise<AssetSchemaDto | null>)} the asset document or null if slug not present
 */
const findOneBySlug = async (
    slug: string
): Promise<AssetSchemaDto | null> => {
    return Asset.findOne({ slug });
};

/**
 * updateOne function updates the asset document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the asset to be updated
 * @param {UpdateAssetDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<AssetSchemaDto | null>)} the updated asset document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: AssetUpdateDto
): Promise<AssetSchemaDto | null> => {
    return Asset.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    create,
    deleteOne,
    find,
    findOne,
    findOneBySlug,
    updateOne,
};

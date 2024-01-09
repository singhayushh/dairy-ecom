import { Types } from "mongoose";
import {
    ProductDto,
    ProductSchemaDto,
    ProductUpdateDto,
} from "../dtos/product.dto";
import { Product } from "../models/product.model";

/**
 * create function creates a new product document and returns it
 *
 * @param {ProductDto} createProductDto the product object to be added to the db
 * @returns  {Promise<ProductSchemaDto>} the created product document
 */
const create = async (
    createProductDto: ProductDto
): Promise<ProductSchemaDto> => {
    return Product.create(createProductDto);
};

/**
 * deleteOne function deletes a single product from the db by given id and returns the deleted product
 *
 * @param {Types.ObjectId} id the object id of the product
 * @returns  {(Promise<ProductSchemaDto | null>)} the deleted product document or null for incorrect id
 */
const deleteOne = async (
    id: Types.ObjectId
): Promise<ProductSchemaDto | null> => {
    return Product.findOneAndDelete({ _id: id });
};

/**
 * find function returns a list of product documents for pagination by its caller
 *
 * @returns  {Promise<ProductSchemaDto[]>} Array of product documents
 */
const find = async (
    userId?: Types.ObjectId
): Promise<ProductSchemaDto[]> => {
    if (userId) return Product.find({ by: userId }).sort({ createdAt: 1 });
    return Product.find().sort({ createdAt: 1 });
};

/**
 * findOne function returns a single product document by given id
 *
 * @param {Types.ObjectId} id object id of the product
 * @returns  {(Promise<ProductSchemaDto | null>)} the product document or null if id not present
 */
const findOne = async (
    id: Types.ObjectId
): Promise<ProductSchemaDto | null> => {
    return Product.findById(id);
};

/**
 * findOneBySlug function returns a single product document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the product
 * @returns  {(Promise<ProductSchemaDto | null>)} the product document or null if slug not present
 */
const findOneBySlug = async (
    slug: string
): Promise<ProductSchemaDto | null> => {
    return Product.findOne({ slug });
};

/**
 * updateOne function updates the product document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the product to be updated
 * @param {UpdateProductDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<ProductSchemaDto | null>)} the updated product document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: ProductUpdateDto
): Promise<ProductSchemaDto | null> => {
    return Product.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    create,
    deleteOne,
    find,
    findOne,
    findOneBySlug,
    updateOne,
};

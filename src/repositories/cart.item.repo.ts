import { Types } from "mongoose";
import {
    CartItemDto,
    CartItemSchemaDto,
    CartItemUpdateDto,
} from "../dtos/cart.item.dto";
import { CartItem } from "../models/cart.item.model";

/**
 * create function creates a new cartItem document and returns it
 *
 * @param {CartItemDto} createCartItemDto the cartItem object to be added to the db
 * @returns  {Promise<CartItemSchemaDto>} the created cartItem document
 */
const create = async (
    createCartItemDto: CartItemDto
): Promise<CartItemSchemaDto> => {
    return CartItem.create(createCartItemDto);
};

/**
 * deleteOne function deletes a single cartItem from the db by given id and returns the deleted cartItem
 *
 * @param {Types.ObjectId} id the object id of the cartItem
 * @returns  {(Promise<CartItemSchemaDto | null>)} the deleted cartItem document or null for incorrect id
 */
const deleteOne = async (
    id: Types.ObjectId
): Promise<CartItemSchemaDto | null> => {
    return CartItem.findOneAndDelete({ _id: id }).lean();
};

/**
 * find function returns a list of cartItem documents for pagination by its caller
 *
 * @returns  {Promise<CartItemSchemaDto[]>} Array of cartItem documents
 */
const find = async (
    userId?: Types.ObjectId
): Promise<CartItemSchemaDto[]> => {
    if (userId) return CartItem.find({ by: userId }).sort({ createdAt: 1 }).lean();
    return CartItem.find().sort({ createdAt: 1 }).lean();
};

/**
 * findOne function returns a single cartItem document by given id
 *
 * @param {Types.ObjectId} id object id of the cartItem
 * @returns  {(Promise<CartItemSchemaDto | null>)} the cartItem document or null if id not present
 */
const findOne = async (
    id: Types.ObjectId
): Promise<CartItemSchemaDto | null> => {
    return CartItem.findById(id).lean();
};

/**
 * findOneBySlug function returns a single cartItem document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the cartItem
 * @returns  {(Promise<CartItemSchemaDto | null>)} the cartItem document or null if slug not present
 */
const findOneBySlug = async (
    slug: string
): Promise<CartItemSchemaDto | null> => {
    return CartItem.findOne({ slug }).lean();
};

/**
 * updateOne function updates the cartItem document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the cartItem to be updated
 * @param {UpdateCartItemDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<CartItemSchemaDto | null>)} the updated cartItem document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: CartItemUpdateDto
): Promise<CartItemSchemaDto | null> => {
    return CartItem.findOneAndUpdate({ _id: id }, dto, { new: true }).lean();
};

export {
    create,
    deleteOne,
    find,
    findOne,
    findOneBySlug,
    updateOne,
};

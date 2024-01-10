import { Types } from "mongoose";
import {
    OrderDto,
    OrderSchemaDto,
    OrderUpdateDto,
} from "../dtos/order.dto";
import { Order } from "../models/order.model";

/**
 * create function creates a new order document and returns it
 *
 * @param {OrderDto} createOrderDto the order object to be added to the db
 * @returns  {Promise<OrderSchemaDto>} the created order document
 */
const create = async (
    createOrderDto: OrderDto
): Promise<OrderSchemaDto> => {
    return Order.create(createOrderDto);
};

/**
 * deleteOne function deletes a single order from the db by given id and returns the deleted order
 *
 * @param {Types.ObjectId} id the object id of the order
 * @returns  {(Promise<OrderSchemaDto | null>)} the deleted order document or null for incorrect id
 */
const deleteOne = async (
    id: Types.ObjectId
): Promise<OrderSchemaDto | null> => {
    return Order.findOneAndDelete({ _id: id }).lean();
};

/**
 * find function returns a list of order documents for pagination by its caller
 *
 * @returns  {Promise<OrderSchemaDto[]>} Array of order documents
 */
const find = async (
    userId?: Types.ObjectId
): Promise<OrderSchemaDto[]> => {
    if (userId) return Order.find({ by: userId }).sort({ createdAt: 1 }).lean();
    return Order.find().sort({ createdAt: 1 }).lean();
};

/**
 * findOne function returns a single order document by given id
 *
 * @param {Types.ObjectId} id object id of the order
 * @returns  {(Promise<OrderSchemaDto | null>)} the order document or null if id not present
 */
const findOne = async (
    id: Types.ObjectId
): Promise<OrderSchemaDto | null> => {
    return Order.findById(id).lean();
};

/**
 * findOneBySlug function returns a single order document by given slug
 *
 * @param {string} slug slug // unique human-readable identifier of the order
 * @returns  {(Promise<OrderSchemaDto | null>)} the order document or null if slug not present
 */
const findOneBySlug = async (
    slug: string
): Promise<OrderSchemaDto | null> => {
    return Order.findOne({ identifier: slug }).lean();
};

/**
 * updateOne function updates the order document of given id by the fields passed in the dto
 *
 * @param {Types.ObjectId} id object id of the order to be updated
 * @param {UpdateOrderDto} dto update dto is an object comprising of fields to be updated
 * @returns  {(Promise<OrderSchemaDto | null>)} the updated order document
 */
const updateOne = async (
    id: Types.ObjectId,
    dto: OrderUpdateDto
): Promise<OrderSchemaDto | null> => {
    return Order.findOneAndUpdate({ _id: id }, dto, { new: true }).lean();
};

export {
    create,
    deleteOne,
    find,
    findOne,
    findOneBySlug,
    updateOne,
};

import { randomBytes } from 'crypto';
import { OrderDto, OrderSchemaDto, OrderUpdateDto } from '../dtos/order.dto';
import { Types } from 'mongoose';
import * as orderRepository from '../repositories/order.repo';

/**
 * Creates a new order.
 *
 * @param dto - OrderDto containing order details.
 * @param user - User identifier associated with the order.
 * @returns Promise<OrderSchemaDto> - Created order.
 */
const createOrder = (dto: OrderDto, user: Types.ObjectId): Promise<OrderSchemaDto> => {
  // Generate a unique slug for the order using random bytes
  dto.identifier = randomBytes(3).toString("hex");
  dto.trackingId = dto.identifier;
  
  // Assign the user identifier to the 'by' field in the order
  dto.user = user;

  // Call the repository function to create the order
  return orderRepository.create(dto);
};

/**
 * Deletes an order based on its slug.
 *
 * @param slug - Unique identifier for the order.
 * @returns Promise<OrderSchemaDto | null> - Deleted order or null if not found.
 */
const deleteOrder = async (slug: string): Promise<OrderSchemaDto | null> => {
  // Find the order by its slug
  const order = await orderRepository.findOneBySlug(slug);

  // If the order is not found, return null
  if (!order) return null;

  // Call the repository function to delete the order
  return orderRepository.deleteOne(order._id);
};

/**
 * Fetches all orderes associated with a user.
 *
 * @param user - User identifier.
 * @returns Promise<OrderSchemaDto[]> - List of orderes.
 */
const fetchAllOrder = async (user?: Types.ObjectId): Promise<OrderSchemaDto[]> => {
  // Call the repository function to find all orderes for the user
  return orderRepository.find(user);
};

/**
 * Fetches an order based on its slug.
 *
 * @param slug - Unique identifier for the order.
 * @returns Promise<OrderSchemaDto | null> - Found order or null if not found.
 */
const fetchOrder = async (slug: string): Promise<OrderSchemaDto | null> => {
  // Call the repository function to find the order by its slug
  return orderRepository.findOneBySlug(slug);
};

/**
 * Updates an order based on its slug.
 *
 * @param slug - Unique identifier for the order.
 * @param dto - OrderUpdateDto containing updated order details.
 * @returns Promise<OrderSchemaDto | null> - Updated order or null if not found.
 */
const updateOrder = async (slug: string, dto: OrderUpdateDto): Promise<OrderSchemaDto | null> => {
  // Find the order by its slug
  const order = await orderRepository.findOneBySlug(slug);

  // If the order is not found, return null
  if (!order) return null;

  // Call the repository function to update the order
  return orderRepository.updateOne(order._id, dto);
};

export {
  createOrder,
  deleteOrder,
  fetchOrder,
  fetchAllOrder,
  updateOrder,
};

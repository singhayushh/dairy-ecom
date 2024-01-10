/*
 * Author: Ayush Singh
 * File: user.service.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { compare } from "bcryptjs";
import { randomBytes } from "crypto";
import {
    UserCacheDto,
    UserDto,
    UserSchemaDto,
    UserUpdateDto,
} from "../dtos/user.dto";
import { redisClient } from "../config/redis.config";
import env from "../config/env.config";
import * as userRepository from "../repositories/user.repo";
import { fetchRole } from "./role.service";
import { Types } from "mongoose";

/**
 * Sign in a user with the provided email and password.
 *
 * @param email - User's email.
 * @param password - User's password.
 * @returns {Promise<{ token: string, dto: UserCacheDto } | null>} - Token and user cache DTO if sign-in is successful, otherwise null.
 */
const signIn = async (
    email: string,
    password: string
): Promise<{ token: string; dto: UserCacheDto } | null> => {
    // Find the user by email
    const user = await userRepository.findByEmail(email);

    // If the user is not found, return null
    if (!user) return null;

    // Compare the provided password with the hashed password in the database
    const checkPassword = await compare(password, user.password);

    // If passwords do not match, return null
    if (!checkPassword) return null;

    // Generate a random token for the user session
    const token = randomBytes(6).toString("hex");

    // Fetch the admin role
    const role = await fetchRole("admin");

    // Create a user cache DTO
    const dto: UserCacheDto = {
        _id: user._id,
        name: user.name,
        email: user.contact.email,
        phone: user.contact.phone,
        role: user.role,
        isAdmin:
            (role && role._id.toString() === user.role?.toString()) ?? false,
    };

    // Store the user cache DTO in Redis with an expiry time
    await redisClient.setEx(token, env.SESSION_EXPIRY, JSON.stringify(dto));

    // Return the token and user cache DTO
    return { token, dto };
};

/**
 * Create a new user.
 *
 * @param dto - UserDto containing user details.
 * @returns {Promise<UserDto>} - Created user.
 */
const createUser = (dto: UserDto): Promise<UserDto> => {
    // Generate a unique slug for the user using random bytes
    dto.slug = randomBytes(3).toString("hex");

    // Generate a code based on the user's slug
    dto.code = dto.slug.toUpperCase();

    // Call the repository function to create the user
    return userRepository.create(dto);
};

/**
 * Fetches all useres associated with a user.
 *
 * @returns Promise<UserSchemaDto[]> - List of useres.
 */
const fetchAllUser = async (
    customerOnly: boolean = true
): Promise<UserSchemaDto[]> => {
    if (customerOnly) {
        const role = await fetchRole("customer");
        return userRepository.find(role?._id);
    }
    // Call the repository function to find all useres for the user
    return userRepository.find();
};

/**
 * Fetches an user based on its slug.
 *
 * @param id - Unique identifier for the user.
 * @returns Promise<UserSchemaDto | null> - Found user or null if not found.
 */
const fetchUser = async (id: Types.ObjectId): Promise<UserSchemaDto | null> => {
    // Call the repository function to find the user by its slug
    return userRepository.findById(id);
};

/**
 * Updates an user based on its slug.
 *
 * @param slug - Unique identifier for the user.
 * @param dto - UserUpdateDto containing updated user details.
 * @returns Promise<UserSchemaDto | null> - Updated user or null if not found.
 */
const updateUser = async (
    id: Types.ObjectId,
    dto: UserUpdateDto
): Promise<UserSchemaDto | null> => {
    // Call the repository function to update the user
    return userRepository.update(id, dto);
};

export { signIn, createUser, fetchAllUser, fetchUser, updateUser };

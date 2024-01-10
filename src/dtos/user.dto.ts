/*
 * Author: Ayush Singh
 * File: user.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document, Schema, Types } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing a user.
 */
type UserDto = {
    /**
     * Unique identifier for the user.
     */
    slug: string;

    /**
     * Code associated with the user.
     */
    code: string;

    /**
     * Name of the user.
     */
    name: string;

    /**
     * Organization to which the user belongs.
     */
    organization: string;

    /**
     * Contact information for the user.
     */
    contact: {
        /**
         * Phone number of the user.
         */
        phone: number;

        /**
         * Optional alternative phone number for the user.
         */
        alternativePhone?: number;

        /**
         * Email address of the user.
         */
        email: string;
    };

    /**
     * Password associated with the user.
     */
    password: string;

    /**
     * Role assigned to the user.
     */
    role?: Types.ObjectId | Schema.Types.Mixed;

    /**
     * One-time password (OTP) for additional authentication.
     */
    otp?: string;

    /**
     * Token used for email verification.
     */
    verificationToken?: string;

    /**
     * Token used for password reset.
     */
    resetToken?: string;

    /**
     * Status information for the user.
     */
    status: {
        /**
         * Indicates whether the user's email is verified.
         */
        emailVerified: boolean;

        /**
         * Indicates whether the user's phone is verified.
         */
        phoneVerified: boolean;

        /**
         * Indicates whether the user is banned.
         */
        isBanned: boolean;

        /**
         * Indicates whether the user is deactivated.
         */
        isDeactivated: boolean;
    };
};

/**
 * Data transfer object for caching user information.
 */
type UserCacheDto = {
    /**
     * Optional identifier for the user.
     */
    _id?: Types.ObjectId;

    /**
     * Name of the user.
     */
    name: string;

    /**
     * Email address of the user.
     */
    email: string;

    /**
     * Phone number of the user.
     */
    phone: number;

    /**
     * Role assigned to the user.
     */
    role?: Types.ObjectId | Schema.Types.Mixed;

    /**
     * Boolean whether user is admin
     */
    isAdmin: boolean;
};

/**
 * Partial data transfer object for updating a user, excluding the password.
 */
type UserUpdateDto = Partial<Omit<UserDto, "password">>;

/**
 * Schema data transfer object representing a user with mongoose Document.
 */
type UserSchemaDto = Document & UserDto;

/**
 * Data transfer object for pagination of users.
 */
type UserPaginationDto = {
    /**
     * Array of users.
     */
    users: UserSchemaDto[];
} & PaginationDto;

export {
    UserCacheDto,
    UserDto,
    UserPaginationDto,
    UserSchemaDto,
    UserUpdateDto,
};

/*
 * Author: Ayush Singh
 * File: user.repo.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Types } from "mongoose";
import { UserUpdateDto, UserDto, UserSchemaDto } from "../dtos/user.dto";
import { User } from "../models/user.model";

/**
 * create function creates a new user document
 *
 * @param {UserDto} createUserDto the user object to be created
 * @returns {Promise<UserSchemaDto>} promise containing the created user document
 */
const create = async (createUserDto: UserDto): Promise<UserSchemaDto> => {
    return User.create(createUserDto);
};

/**
 * deleteOne function deletes a single user from the db by given id
 *
 * @param {Types.ObjectId} id user id to be deleted
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the deleted user document
 */
const deleteOne = async (id: Types.ObjectId): Promise<UserSchemaDto | null> => {
    return User.findOneAndDelete(id).select({ password: 0 }).lean();
};

/**
 * find function returns a list of user documents in paginated format
 *
 * @returns {Promise<UserSchemaDto[]>} promise containing the returned list of user documents
 */
const find = async (role?: Types.ObjectId): Promise<UserSchemaDto[]> => {
    if (role)
        return User.find({ role })
            .select({ password: 0 })
            .sort({ createdAt: 1 })
            .lean();
    return User.find().select({ password: 0 }).sort({ createdAt: 1 }).lean();
};

/**
 * findByEmail function fetches a user document from the db by given email
 *
 * @param {string} email email to be searched
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the returned user document
 */
const findByEmail = async (email: string): Promise<UserSchemaDto | null> => {
    return User.findOne({ email }).populate({ path: "profile" }).lean();
};

/**
 * findByPhone function fetches a user document from the db by given phone
 *
 * @param {string} phone phone to be searched
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the returned user document
 */
const findByPhone = async (phone: string): Promise<UserSchemaDto | null> => {
    return User.findOne({ phone }).lean();
};

/**
 * findById function fetches a user document from the db by given id
 *
 * @param {Types.ObjectId} id user id to be fetched
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the returned user document
 */
const findById = async (id: Types.ObjectId): Promise<UserSchemaDto | null> => {
    return User.findById(id).lean();
};

/**
 * findByResetToken function fetches a user document from the db by given resetToken
 *
 * @param {string} resetToken reset token to be searched
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the returned user document
 */
const findByResetToken = async (
    resetToken: string
): Promise<UserSchemaDto | null> => {
    return User.findOne({ resetToken }).select({ password: 0 }).lean();
};

/**
 * findByVerificationToken function fetches a user document from the db by given verificationToken
 *
 * @param {string} verificationToken verification token to be searched
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the returned user document
 */
const findByVerificationToken = async (
    verificationToken: string
): Promise<UserSchemaDto | null> => {
    return User.findOne({ verificationToken }).select({ password: 0 }).lean();
};

/**
 * updatePassword function updates the user password by given id and password
 *
 * @param {Types.ObjectId} id user id to change the password of
 * @param {string} password new password to be updated
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the updated user document
 */
const updatePassword = async (
    id: Types.ObjectId,
    password: string
): Promise<UserSchemaDto | null> => {
    // fetch user by id
    const user = await findById(id);

    // return null if user not found
    if (!user) return null;

    // update password and reset token
    user.resetToken = "";
    user.password = password;

    // call save() which will hash password in the pre-hook
    return user.save();
};

/**
 * update function updates the user document by given id with fields passed in the dto
 *
 * @param {Types.ObjectId} id id of the user to be updated
 * @param {UserUpdateDto} dto fields to be updated
 * @returns {(Promise<UserSchemaDto | null>)} promise containing the updated user document
 */
const update = async (
    id: Types.ObjectId,
    dto: UserUpdateDto
): Promise<UserSchemaDto | null> => {
    return User.findOneAndUpdate({ _id: id }, dto, { new: true })
        .select({
            password: 0,
        })
        .lean();
};

export {
    create,
    deleteOne,
    find,
    findByEmail,
    findByPhone,
    findById,
    findByResetToken,
    findByVerificationToken,
    updatePassword,
    update,
};

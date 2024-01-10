/*
 * Author: Ayush Singh
 * File: user.model.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { model, Model, Schema } from "mongoose";
import { UserSchemaDto } from "../dtos/user.dto";
import { genSaltSync, hashSync } from "bcryptjs";

const userSchema: Schema<UserSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
            default: "INDIVIDUAL",
        },
        contact: {
            phone: {
                type: Number,
                required: true,
            },
            alternativePhone: Number,
            email: {
                type: String,
                required: true,
                unique: true,
            },
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        otp: String,
        verificationToken: String,
        resetToken: String,
        status: {
            emailVerified: {
                type: Boolean,
                default: false,
            },
            phoneVerified: {
                type: Boolean,
                default: false,
            },
            isBanned: {
                type: Boolean,
                default: false,
            },
            isDeactivated: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    // Check if password was modified
    if (!this.isModified("password") || !this.isNew) {
        next();
    } else this.isModified("password");

    // if password was modified then hash it using bcrypt module by salting it 10x times
    if (this.isModified("password") && this.password) {
        const salt = genSaltSync(10);
        this.password = hashSync(this.password.toString(), salt);
    }
    next();
});

const User: Model<UserSchemaDto> = model("User", userSchema);

export { User };

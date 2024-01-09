import { model, Model, Schema } from "mongoose";
import { UserSchemaDto } from "../dtos/user.dto";

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

const User: Model<UserSchemaDto> = model("User", userSchema);

export { User };

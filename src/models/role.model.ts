/*
 * Author: Ayush Singh
 * File: role.model.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Model, Schema, model } from "mongoose";
import { RoleSchemaDto } from "../dtos/role.dto";

const roleSchema: Schema<RoleSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        resources: [
            {
                resourceKey: {
                    type: Number,
                    required: true,
                },
                resourceName: {
                    type: String,
                    required: true,
                },
                permissions: [
                    {
                        name: String,
                        key: Number,
                        val: Number,
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Role: Model<RoleSchemaDto> = model("Role", roleSchema);

export { Role };

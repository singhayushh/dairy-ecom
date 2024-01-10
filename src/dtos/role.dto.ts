/*
 * Author: Ayush Singh
 * File: role.dto.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Document } from "mongoose";
import { PaginationDto } from "./pagination.dto";

/**
 * Data transfer object for representing a role.
 */
type RoleDto = {
    /**
     * Unique identifier for the role.
     */
    slug: string;

    /**
     * Name of the role.
     */
    name: string;

    /**
     * List of accessible resources associated with the role.
     */
    resources: ResourceDto[];
};

/**
 * Data transfer object for representing a resource.
 */
type ResourceDto = {
    /**
     * Name of the resource (e.g., "Blog").
     */
    resourceName: string;

    /**
     * Key representing the resource (e.g., 2).
     */
    resourceKey: number;

    /**
     * List of available permissions for the resource.
     */
    permissions: PermissionDto[];
};

/**
 * Data transfer object for representing a permission.
 */
type PermissionDto = {
    /**
     * Name of the permission (e.g., "READ", "CREATE").
     */
    name: string;

    /**
     * Reserved key for the permission (0 for create, 1 for read, 2 for update, 3 for delete).
     */
    key: number;

    /**
     * Value indicating whether the permission is allowed (0 for disallow, 1 for allow).
     */
    val: number;
};

/**
 * Data transfer object for pagination of roles.
 */
type RolePaginationDto = {
    /**
     * Array of roles.
     */
    roles: RoleSchemaDto[];
} & PaginationDto;

/**
 * Schema data transfer object representing a role with mongoose Document.
 */
type RoleSchemaDto = RoleDto & Document;

/**
 * Partial data transfer object for updating a role.
 */
type RoleUpdateDto = Partial<RoleDto>;

export {
    RoleDto,
    RoleSchemaDto,
    ResourceDto,
    RolePaginationDto,
    PermissionDto,
    RoleUpdateDto,
};

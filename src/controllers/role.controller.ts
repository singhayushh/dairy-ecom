/*
 * Author: Ayush Singh
 * File: role.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, NextFunction } from "express";
import { RoleDto, RoleSchemaDto, RoleUpdateDto } from "../dtos/role.dto";
import { generateResponse } from "../utils/response.creator";
import * as roleService from "../services/role.service";
import { Types } from "mongoose";

/**
 * Create controller adds a new role to the database
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns response with 201 status code and no body
 */
const Create = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Prepare data transfer object for role creation
        const dto: RoleDto = { ...req.body };
        // Call create role service
        const _role: RoleSchemaDto = await roleService.createRole(dto);
        return generateResponse(res, 201);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts role id from request params
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 202 status code with no body
 */
const Delete = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // servical call to delete the role by given id and return the deleted role
        const role: RoleSchemaDto | null = await roleService.deleteRole(slug);

        // if returned role is null, which means incorrect role id
        if (!role) return generateResponse(res, 404);

        return generateResponse(res, 202);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all roles in non paginated format
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status code with paginated data in response body
 */
const FetchAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // service call to fetch all roles
        const roles: RoleSchemaDto[] = await roleService.fetchAllRole();

        return generateResponse(res, 200, { roles });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchBySlug controller accepts slug from request params and returns the role document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the role document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // service call to fetch role by given slug
        const role: RoleSchemaDto | null = await roleService.fetchRole(
            String(slug)
        );

        // if role is null, which means incorrect role slug
        if (!role) return generateResponse(res, 404);

        return generateResponse(res, 200, { role });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Update controller update the role with given id by the field passed in request body
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns  {Promise<Response | void>} 202 status with empty response body
 */
const Update = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // store updateDto from request body, which filters out password and other non updatadable fields
        const dto: RoleUpdateDto = { ...req.body };

        // service call to update role by given id and fields and return updated role
        const role: RoleSchemaDto | null = await roleService.updateRole(
            slug,
            dto
        );

        // if returned role is null, which means incorrect role id
        if (!role) return generateResponse(res, 404);

        return generateResponse(res, 202);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export { Create, Delete, FetchAll, FetchBySlug, Update };

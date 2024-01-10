/*
 * Author: Ayush Singh
 * File: address.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, NextFunction } from "express";
import { AddressDto, AddressUpdateDto } from "../dtos/address.dto";
import { generateResponse } from "../utils/response.creator";
import * as addressService from "../services/address.service";

/**
 * Create controller adds a new address to the database
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
        // Prepare data transfer object for address creation
        const dto: AddressDto = { ...req.body };
        await addressService.createAddress(dto, res.locals.user._id);
        return res.redirect("/settings/address?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts address id from request params
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

        // servical call to delete the address by given id and return the deleted address
        const address = await addressService.deleteAddress(slug);

        // if returned address is null, which means incorrect address id
        if (!address) return res.redirect("/404");

        return res.redirect("/settings/address?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all addresses in non paginated format
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
        // service call to fetch all addresses
        const addresses = await addressService.fetchAllAddress(
            res.locals.user._id
        );

        return res.render("settings/address", {
            addresses,
            user: res.locals.user,
            cart: res.locals.cart,
            notifications: res.locals.notifications,
        });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchBySlug controller accepts slug from request params and returns the address document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the address document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // service call to fetch address by given slug
        const address = await addressService.fetchAddress(String(slug));

        // if address is null, which means incorrect address slug
        if (!address) return generateResponse(res, 404);

        return generateResponse(res, 200, { address });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Update controller update the address with given id by the field passed in request body
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
        const dto: AddressUpdateDto = { ...req.body };

        // service call to update address by given id and fields and return updated address
        const address = await addressService.updateAddress(slug, dto);

        // if returned address is null, which means incorrect address id
        if (!address) return res.redirect("/404");

        return res.redirect("/settings/address?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export { Create, Delete, FetchAll, FetchBySlug, Update };

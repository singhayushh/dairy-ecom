/*
 * Author: Ayush Singh
 * File: cart.item.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, NextFunction } from "express";
import { CartItemDto, CartItemUpdateDto } from "../dtos/cart.item.dto";
import { generateResponse } from "../utils/response.creator";
import * as cartItemService from "../services/cart.item.service";

/**
 * Create controller adds a new cartItem to the database
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
        // Prepare data transfer object for cartItem creation
        const dto: CartItemDto = { ...req.body };
        await cartItemService.createCartItem(dto, res.locals.user._id);
        return res.redirect("/settings/cart?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts cartItem id from request params
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

        // servical call to delete the cartItem by given id and return the deleted cartItem
        const cartItem = await cartItemService.deleteCartItem(slug);

        // if returned cartItem is null, which means incorrect cartItem id
        if (!cartItem) return res.redirect("/404");

        return res.redirect("/settings/cart?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all cartItems in non paginated format
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
        // service call to fetch all cartItems
        const cartItems = await cartItemService.fetchAllCartItem(
            res.locals.user._id
        );

        return res.render("settings/cart", {
            cartItems,
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
 * FetchBySlug controller accepts slug from request params and returns the cartItem document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the cartItem document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // service call to fetch cartItem by given slug
        const cartItem = await cartItemService.fetchCartItem(String(slug));

        // if cartItem is null, which means incorrect cartItem slug
        if (!cartItem) return generateResponse(res, 404);

        return generateResponse(res, 200, { cartItem });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Update controller update the cartItem with given id by the field passed in request body
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
        const dto: CartItemUpdateDto = { ...req.body };

        // service call to update cartItem by given id and fields and return updated cartItem
        const cartItem = await cartItemService.updateCartItem(slug, dto);

        // if returned cartItem is null, which means incorrect cartItem id
        if (!cartItem) return res.redirect("/404");

        return res.redirect("/settings/cart?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export { Create, Delete, FetchAll, FetchBySlug, Update };

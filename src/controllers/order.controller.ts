/*
 * Author: Ayush Singh
 * File: order.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, NextFunction } from "express";
import { OrderDto, OrderUpdateDto } from "../dtos/order.dto";
import * as orderService from "../services/order.service";

/**
 * Create controller adds a new order to the database
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
        const page = String(req.query.page ?? "settings");

        // Prepare data transfer object for order creation
        const dto: OrderDto = { ...req.body };
        await orderService.createOrder(dto, res.locals.user._id);
        return res.redirect(`/${page}/orders?message=success&page=${page}`);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts order id from request params
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
        const page = String(req.query.page ?? "settings");

        // servical call to delete the order by given id and return the deleted order
        const order = await orderService.deleteOrder(slug);

        // if returned order is null, which means incorrect order id
        if (!order) return res.redirect("/404");

        return res.redirect(`/${page}/orders?message=success&page=${page}`);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all orders in non paginated format
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
        const page = String(req.query.page ?? "settings");
        // service call to fetch all orders
        const orders = await orderService.fetchAllOrder(
            page == "console" ? undefined : res.locals.user._id
        );
        return res.render(`/${page}/orders?page=${page}`, {
            orders,
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
 * FetchBySlug controller accepts slug from request params and returns the order document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the order document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;
        const page = String(req.query.page ?? "settings");

        // service call to fetch order by given slug
        const order = await orderService.fetchOrder(String(slug));

        // if order is null, which means incorrect order slug
        if (!order) return res.redirect("/404");

        return res.render(`${page}/orders`, {
            order,
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
 * Update controller update the order with given id by the field passed in request body
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
        const page = String(req.query.page ?? "settings");

        // store updateDto from request body, which filters out password and other non updatadable fields
        const dto: OrderUpdateDto = { ...req.body };

        // service call to update order by given id and fields and return updated order
        const order = await orderService.updateOrder(slug, dto);

        // if returned order is null, which means incorrect order id
        if (!order) return res.redirect("/404");

        return res.redirect(`/${page}/orders?message=success&page=${page}`);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export { Create, Delete, FetchAll, FetchBySlug, Update };

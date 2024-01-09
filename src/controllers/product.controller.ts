import { Request, Response, NextFunction } from "express";
import {
    ProductDto,
    ProductUpdateDto,
} from "../dtos/product.dto";
import * as productService from "../services/product.service";

/**
 * Create controller adds a new product to the database
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
        // Prepare data transfer object for product creation
        const dto: ProductDto = { ...req.body };
        await productService.createProduct(dto, res.locals.user._id);
        return res.redirect("/console/products?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts product id from request params
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

        // servical call to delete the product by given id and return the deleted product
        const product = await productService.deleteProduct(slug);

        // if returned product is null, which means incorrect product id
        if (!product) return res.redirect("/404");

        return res.redirect("/console/products?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all products in non paginated format
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
        // service call to fetch all products
        const products = await productService.fetchAllProduct(res.locals.user._id)

        return res.render("console/products", { products, user: res.locals.user, cart: res.locals.cart, notifications: res.locals.notifications });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchBySlug controller accepts slug from request params and returns the product document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the product document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // service call to fetch product by given slug
        const product = await productService.fetchProduct(String(slug));

        // if product is null, which means incorrect product slug
        if (!product) return res.redirect("/404");

        return res.redirect(`/console/products/${product.slug}?message=success`);
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Update controller update the product with given id by the field passed in request body
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
        const dto: ProductUpdateDto = { ...req.body };

        // service call to update product by given id and fields and return updated product
        const product = await productService.updateProduct(slug, dto);

        // if returned product is null, which means incorrect product id
        if (!product) return res.redirect("/404");

        return res.redirect("/console/products?message=success")
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export {
    Create,
    Delete,
    FetchAll,
    FetchBySlug,
    Update,
};

import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import * as productService from "../services/product.service";
import { ProductCategory } from "../dtos/product.dto";

/**
 * Renders the settings page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const user = await userService.fetchUser(res.locals.user._id);
        if (!user) res.redirect("/404");
        return res.render("settings/index", { user, cart: res.locals.cart, notifications: res.locals.notifications });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the home page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderHome = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const products = await productService.fetchAllProduct();
        const milkProducts = products.filter(product => product.category === ProductCategory.MILK);
        const butterProducts = products.filter(product => product.category === ProductCategory.BUTTER);
        const creamProducts = products.filter(product => product.category === ProductCategory.CREAM);
        const gheeProducts = products.filter(product => product.category === ProductCategory.GHEE);
        const otherProducts = products.filter(product => product.category === ProductCategory.OTHERS);
        return res.render("home/index", { products, milkProducts, butterProducts, creamProducts, gheeProducts, otherProducts, cart: res.locals.cart, notifications: res.locals.notifications });
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the store page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderStore = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const products = await productService.fetchAllProduct();
        const milkProducts = products.filter(product => product.category === ProductCategory.MILK);
        const butterProducts = products.filter(product => product.category === ProductCategory.BUTTER);
        const creamProducts = products.filter(product => product.category === ProductCategory.CREAM);
        const gheeProducts = products.filter(product => product.category === ProductCategory.GHEE);
        const otherProducts = products.filter(product => product.category === ProductCategory.OTHERS);
        return res.render("home/store", { products, milkProducts, butterProducts, creamProducts, gheeProducts, otherProducts, cart: res.locals.cart, notifications: res.locals.notifications });
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the about page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderAbout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Add any necessary logic to fetch data for the about page
        return res.render("home/about", { /* Add necessary data here */ });
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the terms and conditions page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderTnC = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Add any necessary logic to fetch data for the terms and conditions page
        return res.render("home/tnc", { /* Add necessary data here */ });
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the privacy policy page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderPrivacyPolicy = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Add any necessary logic to fetch data for the privacy policy page
        return res.render("home/privacy", { /* Add necessary data here */ });
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the refund policy page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderRefundPolicy = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Add any necessary logic to fetch data for the refund policy page
        return res.render("home/refund", { /* Add necessary data here */ });
    } catch (error: any) {
        next(error);
    }
};

export {
    RenderHome,
    RenderAbout,
    RenderTnC,
    RenderPrivacyPolicy,
    RenderRefundPolicy,
    RenderSettings,
    RenderStore,
};
import { Request, Response, NextFunction } from "express";
import {
    AssetDto,
    AssetUpdateDto,
} from "../dtos/asset.dto";
import { generateResponse } from "../utils/response.creator";
import * as assetService from "../services/asset.service";

/**
 * Create controller adds a new asset to the database
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
        // Prepare data transfer object for asset creation
        const dto: AssetDto = { ...req.body };
        await assetService.createAsset(dto, res.locals.user._id);
        return res.redirect("/console/assets?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts asset id from request params
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

        // servical call to delete the asset by given id and return the deleted asset
        const asset = await assetService.deleteAsset(slug);

        // if returned asset is null, which means incorrect asset id
        if (!asset) return res.redirect("/404");

        return res.redirect("/console/assets?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all assets in non paginated format
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
        // service call to fetch all assets
        const assets = await assetService.fetchAllAsset(res.locals.user._id)

        return res.render("console/assets", { assets, user: res.locals.user, cart: res.locals.cart, notifications: res.locals.notifications });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchBySlug controller accepts slug from request params and returns the asset document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the asset document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // service call to fetch asset by given slug
        const asset = await assetService.fetchAsset(String(slug));

        // if asset is null, which means incorrect asset slug
        if (!asset) return generateResponse(res, 404);

        return generateResponse(res, 200, { asset });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Update controller update the asset with given id by the field passed in request body
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
        const dto: AssetUpdateDto = { ...req.body };

        // service call to update asset by given id and fields and return updated asset
        const asset = await assetService.updateAsset(slug, dto);

        // if returned asset is null, which means incorrect asset id
        if (!asset) return res.redirect("/404");

        return res.redirect("/console/assets?message=success")
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

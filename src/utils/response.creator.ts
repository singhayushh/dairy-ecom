import { Response } from "express";

interface ApiResponse {
    code: number;
    result?: any;
    message: string;
    type: string;
}

type ResponseType = {
    [key: number]: ApiResponse;
};

const responseType: ResponseType = {
    200: {
        code: 200,
        message: "Successfully loaded data",
        type: "OK",
    },
    201: {
        code: 201,
        message: "Successfully created entry",
        type: "Created",
    },
    202: {
        code: 202,
        message: "Successfully accepted entry",
        type: "Accepted",
    },
    204: {
        code: 204,
        message: "No content available",
        type: "No Content",
    },
    400: {
        code: 400,
        message: "Bad request",
        type: "Bad Request",
    },
    401: {
        code: 401,
        message: "Unauthorized",
        type: "Unauthorized",
    },
    403: {
        code: 403,
        message: "Forbidden",
        type: "Forbidden",
    },
    404: {
        code: 404,
        message: "Resource not found",
        type: "Not Found",
    },
    405: {
        code: 405,
        message: "Method not allowed",
        type: "Method Not Allowed",
    },
    406: {
        code: 406,
        message: "Not acceptable",
        type: "Not Acceptable",
    },
    413: {
        code: 413,
        message: "Request entity too large",
        type: "Request Entity Too Large",
    },
    500: {
        code: 500,
        message: "An unknown error occurred",
        type: "Server Error",
    },
};

/**
 * Generates a response for the Express application based on the provided parameters.
 *
 * @param {Response} res - Express Response object
 * @param {number} [code=200] - Status code to be returned
 * @param {*} [result={}] - Data to be passed in the response body
 * @param {string} [customMessage=""] - Additional message to be passed in the response
 * @returns {Response} - Express Response object
 */
const generateResponse = (
    res: Response,
    code: number = 200,
    result: any = {},
    customMessage: string = ""
): Response => {
    const { message, type } = responseType[code];
    const responseMessage = customMessage || message;

    const apiResponse: ApiResponse = {
        code,
        result,
        message: responseMessage,
        type,
    };

    return res.status(code).json(apiResponse);
};

export { generateResponse };

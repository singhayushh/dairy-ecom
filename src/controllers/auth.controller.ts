import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { redisClient } from "../config/redis.config";
import { UserDto } from "../dtos/user.dto";
import env from "../config/env.config";

const RenderSignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const message = req.query.message;
        res.render("login", { message });
    } catch (error) {
        next(error);
    }
};

const RenderSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const message = req.query.message;
        res.render("register", { message });
    } catch (error) {
        next(error);
    }
};

const SignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const result = await userService.signIn(email, password);

        if (result) {
            await redisClient.setEx(result.token, env.SESSION_EXPIRY, JSON.stringify(result.dto));

            res.cookie("session", result?.token, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 24 * 8.64e7,
            });
        }

        return res.redirect("/");
    } catch (error) {
        next(error);
    }
};

const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: UserDto = { ...req.body };
        const user = await userService.createUser(dto);
        return res.redirect("/auth/login?message=Verify email before login");
    } catch (error) {
        next(error);
    }
};

const SignOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("session", null, { maxAge: 0 });
        res.redirect("/auth/login");
    } catch (error) {
        next(error);
    }
};

export { RenderSignIn, RenderSignUp, SignIn, SignOut, SignUp };

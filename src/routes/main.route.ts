/*
 * Author: Ayush Singh
 * File: main.route.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, Router } from "express";
import { SettingsRouter, AuthRouter } from "./user.route";
import { AuthenticationMiddleware } from "../middlewares/authentication.middleware";
import { ConsoleRouter } from "./console.route";
import { UIRouter } from "./ui.route";

const mainRouter: Router = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/settings", AuthenticationMiddleware(true), SettingsRouter);
mainRouter.use("/console", AuthenticationMiddleware(true, true), ConsoleRouter);
mainRouter.use("/", AuthenticationMiddleware(), UIRouter);

mainRouter.use((req: Request, res: Response) => {
    res.render("404", { page: "error", user: res.locals.user });
});

export { mainRouter };

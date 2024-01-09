import { Request, Response, Router } from "express";
import { AccountRouter, AuthRouter } from "./user.route";

const mainRouter: Router = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/settings", AccountRouter);

mainRouter.use((req: Request, res: Response) => {
    res.render("404", { page: "error", user: res.locals.user });
});

export { mainRouter };

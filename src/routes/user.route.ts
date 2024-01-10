import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import * as ui from "../controllers/ui.controller";
import * as cart from "../controllers/cart.item.controller";
import * as order from "../controllers/order.controller";
import * as address from "../controllers/address.controller";
import { AuthenticationMiddleware } from "../middlewares/authentication.middleware";

const SettingsRouter: Router = Router();

SettingsRouter.get("/", ui.RenderSettings);
SettingsRouter.get("/cart", cart.FetchAll);
SettingsRouter.get("/orders", order.FetchAll);
SettingsRouter.get("/address", address.FetchAll);
SettingsRouter.get("/order/:slug", order.FetchBySlug);

const AuthRouter: Router = Router();

AuthRouter.get("/login", auth.RenderSignIn);
AuthRouter.get("/logout", AuthenticationMiddleware(true), auth.SignOut);
AuthRouter.get("/register", auth.RenderSignUp);
AuthRouter.post("/login", auth.SignIn);
AuthRouter.post("/register", auth.SignUp);

export { SettingsRouter, AuthRouter };

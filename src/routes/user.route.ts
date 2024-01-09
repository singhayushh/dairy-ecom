import { Router } from "express";
import * as auth from "../controllers/auth.controller";

const AccountRouter: Router = Router();

AccountRouter.get("/", ui.RenderSettings);
AccountRouter.get("/cart", ui.RenderCart);
AccountRouter.get("/orders", ui.RenderOrders);
AccountRouter.get("/address", ui.RenderAddresses);
AccountRouter.get("/order/:trackingId", ui.RenderTracking);

const AuthRouter: Router = Router();

AuthRouter.get("/login", auth.RenderSignIn);
AuthRouter.get("/logout", auth.SignOut);
AuthRouter.get("/register", auth.RenderSignUp);
AuthRouter.post("/login", auth.SignIn);
AuthRouter.post("/register", auth.SignUp);

export { AccountRouter, AuthRouter };

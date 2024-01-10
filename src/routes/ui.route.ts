import { Router } from "express";
import * as ui from "../controllers/ui.controller";

const UIRouter = Router();

UIRouter.get("/", ui.RenderHome);
UIRouter.get("/about", ui.RenderAbout);
UIRouter.get("/store", ui.RenderStore);
UIRouter.get("terms-and-conditions", ui.RenderTnC);
UIRouter.get("/privacy-policy", ui.RenderPrivacyPolicy);
UIRouter.get("/refund-policy", ui.RenderRefundPolicy);

export { UIRouter };
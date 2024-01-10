import { Router } from "express";
import * as console from "../controllers/console.controller";
import * as product from "../controllers/product.controller";
import * as order from "../controllers/order.controller";
import * as transaction from "../controllers/transaction.controller";
import * as asset from "../controllers/asset.controller";

const ConsoleRouter = Router();

ConsoleRouter.get("/", console.RenderDashboard);
ConsoleRouter.get("/assets", asset.FetchAll);
ConsoleRouter.get("/users", console.RenderUsers);
ConsoleRouter.get("/products", product.FetchAll);
ConsoleRouter.get("/orders", order.FetchAll);
ConsoleRouter.get("/transactions", transaction.FetchAll);

export { ConsoleRouter };
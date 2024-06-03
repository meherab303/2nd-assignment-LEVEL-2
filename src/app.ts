import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./modules/product/product.router";
import { OrderRouter } from "./modules/order/order.router";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
export default app;

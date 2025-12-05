import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userrouters from "./router/userRoutes.js";
import productroutes from "./router/productRoutes.js";
import categoryroutes from "./router/categoryRoutes.js";
import cartroutes from "./router/cartRouter.js";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/ping", (req, res) => {
  res.send("Server is set up and running");
});

app.use("/api/users", userrouters);
app.use("/api/products", productroutes);
app.use("/api/category", categoryroutes);
app.use("/api/cart", cartroutes);

export default app;

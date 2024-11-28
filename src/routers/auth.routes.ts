import express from "express";

import { getUserByIdController, login, register } from "../controllers/auth.controller";
import { authenticateHandler } from "../middlewares/authenticate";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user",  authenticateHandler, getUserByIdController);

export default authRouter;

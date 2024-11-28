import express from "express";

import {
  createCompanySettings,
  getCompanySettings,
} from "../controllers/companySettings.controller";
import { authenticateHandler } from "../middlewares/authenticate";

const companySettingsRouter = express.Router();

companySettingsRouter.post("/",   authenticateHandler,createCompanySettings);
companySettingsRouter.get("/",   authenticateHandler,getCompanySettings);

export default companySettingsRouter;

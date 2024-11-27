import express from "express";

import {
  createCompanySettings,
  getCompanySettings,
} from "../controllers/companySettings.controller";

const companySettingsRouter = express.Router();

companySettingsRouter.post("/", createCompanySettings);
companySettingsRouter.get("/:userId", getCompanySettings);

export default companySettingsRouter;

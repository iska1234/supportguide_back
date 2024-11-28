import express from "express";
import {
  createTopicController,
  getAllTopicsController,
  updateTopicController,
} from "../controllers/topic.controller";
import { authenticateHandler } from "../middlewares/authenticate";

const topicRouter = express.Router();

topicRouter.post("/", authenticateHandler, createTopicController);
topicRouter.get("/", authenticateHandler, getAllTopicsController);
topicRouter.put("/:id", authenticateHandler, updateTopicController);
export default topicRouter;

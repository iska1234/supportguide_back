import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error";
import Server from "./classes/server";
import authRouter from "./routers/auth.routes";
import companySettingsRouter from "./routers/companySettings.routes";
import topicRouter from "./routers/topic.routes";

const server = Server.instance;
const morgan = require('morgan');

configDotenv();

const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

server.app.use(express.json());
server.app.use(cookieParser());

server.app.use(cors(corsOptions));
server.app.use(errorHandler);
server.app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

server.app.use("/auth", authRouter);
server.app.use("/companySettings", companySettingsRouter);
server.app.use("/topic", topicRouter);
// server.app.use("/sections", sectionsRouter);
// server.app.use("/questionnaries", questionnariesRouter);
// server.app.use("/questions", questionsRouter);
// server.app.use("/answers", answersRouter);

server.start(() => {
  console.log(`Escuchando al puerto ${server.port}`);
});

server.app.get("/", (_req, res) => {
  res.send("¡Bienvenido!");
});

export default server;

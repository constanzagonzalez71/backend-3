import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

const app = express();
const PORT = 8080;

/* =====================
   Middlewares
===================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =====================
   Swagger
===================== */

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Adoptions",
      description: "Documentación del módulo Users",
    },
  },
  apis: ["./src/docs/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

/* =====================
   MongoDB
===================== */

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((err) => console.error("🔴 Error MongoDB", err));

/* =====================
   Routes
===================== */

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

/* =====================
   Server
===================== */

app.listen(PORT, () => {
  console.log(`🚀 Listening on ${PORT}`);
});

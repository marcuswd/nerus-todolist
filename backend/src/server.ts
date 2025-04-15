import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger-output.json";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import TodosRoutes from "./routes/TodosRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: false,
}));
app.use("/api", TodosRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
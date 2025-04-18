import express, { Request } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import TodosRoutes from "./routes/TodosRoutes";

const app = express();
const PORT : number = Number(process.env.PORT) || 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: false,
}));
app.use("/api", TodosRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
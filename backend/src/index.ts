import express from "express";
import cors from "cors";
import { createMealsRouter } from "./routes/meals.router";
import { connectToDatabase } from "./services/database.service";
import { collections } from "./services/database.service";

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

connectToDatabase()
  .then(() => {
    app.use("/meals", createMealsRouter(collections.meals));

    app.listen(PORT, () => {
      console.log(`Server running on 0.0.0.0:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

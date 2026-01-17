import express from "express";
import { mealsRouter } from "./routes/meals.router";
import { connectToDatabase } from "./services/database.service";

const app = express();
const PORT = 8080;

connectToDatabase()
  .then(() => {
    app.use("/meals", mealsRouter);

    app.listen(PORT, () => {
      console.log(`Server running on 0.0.0.0:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

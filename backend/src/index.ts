import express from "express";
import cors from "cors";
import { createMealsRouter } from "./routes/meals.router";
import { connectToDatabase } from "./services/database.service";
import { collections } from "./services/database.service";
import { testRouter } from "./routes/test.router";

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

    if (process.env.ENV === "test") {
      console.log("Running in test mode");
      app.use("/test", testRouter);
    }

    app.listen(PORT, () => {
      console.log(`Server running on 0.0.0.0:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

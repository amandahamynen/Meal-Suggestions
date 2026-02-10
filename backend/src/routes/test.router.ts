import { Router } from "express";
import { resetDatabaseForTests } from "../services/database.service";

export const testRouter = Router();

testRouter.get("/reset-db", async (_req, res) => {
  if (process.env.ENV !== "test") {
    return res.sendStatus(403);
  }

  try {
    await resetDatabaseForTests();
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default testRouter;

import express, { Request, Response, Router } from "express";
import { Collection, ObjectId } from "mongodb";
import Meal from "../models/meal";

export function createMealsRouter(mealsCollection?: Collection<Meal>): Router {
  const mealsRouter = express.Router();
  mealsRouter.use(express.json());

  mealsRouter.get("/", async (_req: Request, res: Response) => {
    if (!mealsCollection) {
      res.status(500).send("Database not initialized");
      return;
    }
    const meals = await mealsCollection.find({}).toArray();
    res.status(200).send(meals);
  });

  mealsRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Array.isArray(id)) {
      res.status(400).send("Invalid meal id");
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).send("Invalid meal id");
      return;
    }
    if (!mealsCollection) {
      res.status(500).send("Database not initialized");
      return;
    }
    const query = { _id: new ObjectId(id) };
    const meal = await mealsCollection.findOne(query);

    if (meal) {
      res.status(200).send(meal);
    }
    res.status(404).send(`Meal with id ${id} not found`);
  });

  mealsRouter.post("/", async (req: Request, res: Response) => {
    if (!mealsCollection) {
      res.status(500).send("Database not initialized");
      return;
    }
    const newmeal = req.body;
    const result = await mealsCollection.insertOne(newmeal);
    if (result) {
      res.status(200).send(newmeal);
    }
  });

  mealsRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Array.isArray(id)) {
      res.status(400).send("Invalid meal id");
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).send("Invalid meal id");
      return;
    }
    if (!mealsCollection) {
      res.status(500).send("Database not initialized");
      return;
    }
    const query = { _id: new ObjectId(id) };
    const result = await mealsCollection.deleteOne(query);

    if (result) {
      res.status(200).send(`Deleted a meal with id ${id}`);
    }
  });

  return mealsRouter;
}

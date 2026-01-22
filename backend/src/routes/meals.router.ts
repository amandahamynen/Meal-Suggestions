import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

export const mealsRouter = express.Router();

mealsRouter.use(express.json());

mealsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    if (!collections.meals) {
      res.status(500).send("Database not initialized");
      return;
    }
    const meals = await collections.meals.find({}).toArray();
    res.status(200).send(meals);
  } catch (error) {
    let errorMessage = "An error occurred while retrieving meals.";
    if (error instanceof Error) {
      errorMessage = error.message;
      res.status(500).send(errorMessage);
    }
  }
});

mealsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    if (typeof id !== "string") {
      res.status(400).send("Invalid meal id");
      return;
    }
    if (!collections.meals) {
      res.status(500).send("Database not initialized");
      return;
    }
    const query = { _id: new ObjectId(id) };
    const meal = await collections.meals.findOne(query);

    if (meal) {
      res.status(200).send(meal);
    }
  } catch (error) {
    let errorMessage = "An error occurred while retrieving a meal.";
    if (error instanceof Error) {
      errorMessage = error.message;
      res.status(500).send(errorMessage);
    }
  }
});

mealsRouter.post("/", async (req: Request, res: Response) => {
  try {
    if (!collections.meals) {
      res.status(500).send("Database not initialized");
      return;
    }
    const newmeal = req.body;
    const result = await collections.meals.insertOne(newmeal);
    if (result) {
      res
        .status(201)
        .send(`Successfully created a new meal with id ${result.insertedId}`);
    } else {
      res.status(500).send("Failed to create a new meal.");
    }
  } catch (error) {
    let errorMessage = "An error occurred while creating a new meal.";
    if (error instanceof Error) {
      errorMessage = error.message;
      res.status(400).send(errorMessage);
    }
  }
});

mealsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    if (typeof id !== "string") {
      res.status(400).send("Invalid meal id");
      return;
    }
    if (!collections.meals) {
      res.status(500).send("Database not initialized");
      return;
    }
    const query = { _id: new ObjectId(id) };
    const result = await collections.meals.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed meal with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove meal with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`meal with id ${id} does not exist`);
    }
  } catch (error) {
    let errorMessage = "An error occurred while deleting a meal.";
    if (error instanceof Error) {
      errorMessage = error.message;
      res.status(400).send(errorMessage);
    }
  }
});

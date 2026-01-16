import type { Request, Response, NextFunction } from 'express';
import type { Meal } from '../models/meal';
import { meals } from '../models/meal';

interface MealParams {
  id: string; // route param is always a string
}

export const addMeal = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Meal name is required" });
    }
    const newMeal: Meal = {
      id: meals.length > 0 ? Math.max(...meals.map(m => m.id)) + 1 : 1,
      name,
    };
    meals.push(newMeal);
    return res.status(201).json(newMeal);
  } catch (error) {
    return next(error);
  }
};

export const getMeals = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(meals);
  } catch (error) {
    next(error);
  }
};

export const getMealById = (req: Request<MealParams>, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({ message: "Invalid meal id" });
    }
    const meal = meals.find((i) => i.id === id);
    if (!meal) {
      res.status(404).json({ message: 'Meal not found' });
      return;
    }
    return res.json(meal);
  } catch (error) {
    return next(error);
  }
};

export const deleteMeal = (req: Request<MealParams>, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const mealIndex = meals.findIndex((i) => i.id === id);
    if (mealIndex === -1) {
      res.status(404).json({ message: 'Meal not found' });
      return;
    }
    const deletedMeal = meals.splice(mealIndex, 1)[0];
    res.json(deletedMeal);
  } catch (error) {
    next(error);
  }
};

export const getRandomMeal = (_req: Request, res: Response) => {
  if (meals.length === 0) {
    return res.status(404).json({ message: "No meals available" });
  }
  const randomIndex = Math.floor(Math.random() * meals.length);
  console.log("Random index:", randomIndex);
  return res.json(meals[randomIndex]);
};
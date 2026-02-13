import { Meal } from "../types/meal";
import { MEALS_URL } from "../constants/api.constants";

const getMeals = async () => {
  const response = await fetch(MEALS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  const data = (await response.json()) as Meal[];
  return data;
};

const addMeal = async (meal: Meal) => {
  const response = await fetch(MEALS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    throw new Error("Failed to add meal");
  }
  const data = await response.json();
  return data;
};

const deleteMeal = async (meal: Meal) => {
  const response = await fetch(`${MEALS_URL}/${meal._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete meal");
  }
};

export default {
  getMeals,
  addMeal,
  deleteMeal,
};

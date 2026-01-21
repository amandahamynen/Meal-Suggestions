import { Meal } from "../types/meal";
import { getMealsUrl } from "../constants/api.constants";

const getMeals = async () => {
  const response = await fetch(getMealsUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  const data = (await response.json()) as Meal[];
  return data;
};

export default {
  getMeals,
};

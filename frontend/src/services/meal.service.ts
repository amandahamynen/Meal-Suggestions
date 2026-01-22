import { Meal } from "../types/meal";
import { GET_MEALS_URL } from "../constants/api.constants";

const getMeals = async () => {
  const response = await fetch(GET_MEALS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  const data = (await response.json()) as Meal[];
  return data;
};

export default {
  getMeals,
};

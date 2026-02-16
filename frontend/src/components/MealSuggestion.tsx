import { useEffect, useState } from "react";
import { Meal } from "../types/meal";
import mealService from "../services/meal.service";
import shuffle from "../utils/shuffle";

function MealSuggestion() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [index, setIndex] = useState(-1);

  const hasMeals = meals.length > 0;
  const hasStarted = index !== -1;

  useEffect(() => {
    mealService.getMeals().then((data) => {
      setMeals(shuffle(data));
      setIndex(-1);
    });
  }, []);

  const handleClick = () => {
    if (!hasMeals) return;
    setIndex((prev) => (prev + 1) % meals.length);
  };

  const mealText = !hasMeals
    ? "Add meals to get suggestions"
    : !hasStarted
      ? "Press the button"
      : (meals[index]?.name ?? "");

  return (
    <div className="MealSuggestion">
      <h1 className="MealSuggestion__Title" data-testid="meal-suggestion-title">
        {hasMeals ? "I should make..." : "No meals available"}
      </h1>
      <p
        className="MealSuggestion__Result"
        data-testid="meal-suggestion-result"
      >
        {mealText}
      </p>
      {hasMeals && (
        <button
          className="MealSuggestion__Button"
          data-testid="suggest-meal-button"
          onClick={handleClick}
        >
          Give a suggestion
        </button>
      )}
    </div>
  );
}

export default MealSuggestion;

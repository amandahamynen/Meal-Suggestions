import { useState, useEffect } from "react";
import "./App.css";
import { Meal } from "./types/meal";
import mealService from "./services/meal.service";
import shuffle from "./utils/suffle";

function App() {
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
      <div className="MealSuggestion__Content">
        <h1 className="MealSuggestion__Title">
          {hasMeals ? "I should make..." : "No meals available"}
        </h1>
        <p className="MealSuggestion__Result">{mealText}</p>
        {hasMeals && (
          <button className="MealSuggestion__Button" onClick={handleClick}>
            Give a suggestion
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

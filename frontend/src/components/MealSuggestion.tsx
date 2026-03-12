import { useEffect, useState } from "react";
import { Meal } from "../types/meal";
import mealService from "../services/meal.service";
import shuffle from "../utils/shuffle";
import AnimatedContent from "./reactbits/AnimatedContent";

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
      <AnimatedContent
        distance={1000}
        direction="horizontal"
        reverse={false}
        duration={2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0}
      >
        <h1
          className="MealSuggestion__Title"
          data-testid="meal-suggestion-title"
        >
          <div>{hasMeals ? "I should make..." : "No meals available"}</div>
        </h1>
      </AnimatedContent>
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

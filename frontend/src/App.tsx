import { useState, useEffect } from "react";
import "./App.css";
import { Meal } from "./types/meal";
import mealService from "./services/meal.service";
import shuffle from "./utils/suffle";

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    mealService.getMeals().then((data) => {
      setMeals(shuffle(data));
      setIndex(-1);
    });
  }, []);

  const handleClick = () => {
    if (meals.length === 0) return;
    setIndex((prev) => (prev + 1) % meals.length);
  };

  const displayText =
    index === -1 ? "Press the button" : (meals[index]?.name ?? "");

  return (
    <div className="App">
      <div className="content">
        <h1>I should make...</h1>
        <p className="meal-name">{displayText}</p>
        <button className="generate-button" onClick={handleClick}>
          Give a suggestion
        </button>
      </div>
    </div>
  );
}

export default App;

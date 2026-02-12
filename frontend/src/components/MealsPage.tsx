import { useEffect, useState } from "react";
import { Meal } from "../types/meal";
import mealService from "../services/meal.service";

function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    mealService.getMeals().then((data) => {
      setMeals(data);
    });
  }, []);

  return (
    <div className="MealGrid">
      {meals.map((meal) => (
        <div className="MealCard" key={meal.name}>
          <h3 className="MealCard__Title">{meal.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default MealsPage;

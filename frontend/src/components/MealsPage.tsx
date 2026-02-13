import { useEffect, useState } from "react";
import { Meal } from "../types/meal";
import mealService from "../services/meal.service";

function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState<Meal>({ name: "" });

  useEffect(() => {
    mealService.getMeals().then((data) => {
      setMeals(data);
    });
  }, []);

  const addMeal = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newMeal.name.trim() === "") return;
    await mealService.addMeal(newMeal);
    setMeals([...meals, newMeal]);
    setNewMeal({ name: "" });
  };

  return (
    <div className="MealsPage">
      <div className="MealAdd">
        <form onSubmit={addMeal}>
          <input
            className="MealAdd__Input"
            type="text"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ name: e.target.value })}
            placeholder="Add a meal..."
          />
          <button
            type="submit"
            className="MealAdd__Button"
            disabled={!newMeal.name.trim()}
          >
            Add
          </button>
        </form>
      </div>
      <div className="MealGrid">
        {meals.map((meal) => (
          <div className="MealCard" key={meal.name}>
            <h3 className="MealCard__Title">{meal.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealsPage;

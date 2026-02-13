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
    const createdMeal = await mealService.addMeal(newMeal);
    setMeals((prevMeals) => [...prevMeals, createdMeal]);
    setNewMeal({ name: "" });
  };

  const handleDelete = (meal: Meal) => {
    if (!window.confirm(`Delete "${meal.name}"?`)) return;
    setMeals((prevMeals) => prevMeals.filter((m) => m.name !== meal.name));
    mealService.deleteMeal(meal);
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
            <span className="MealCard__Title">{meal.name}</span>
            <button
              className="MealCard__Delete"
              onClick={() => handleDelete(meal)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealsPage;

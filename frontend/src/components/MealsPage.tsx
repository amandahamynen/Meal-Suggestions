import { useEffect, useState } from "react";
import { Meal } from "../types/meal";
import mealService from "../services/meal.service";
import AnimatedContent from "./reactbits/AnimatedContent";

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
    setMeals((prevMeals) => prevMeals.filter((m) => m._id !== meal._id));
    mealService.deleteMeal(meal);
  };

  return (
    <AnimatedContent
      distance={40}
      direction="vertical"
      duration={0.6}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      delay={0}
    >
      <div className="MealsPage">
        <div className="MealAdd">
          <form onSubmit={addMeal}>
            <input
              className="MealAdd__Input"
              type="text"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ name: e.target.value })}
              placeholder="Add a meal..."
              data-testid="meal-add-input"
            />
            <button
              type="submit"
              className="MealAdd__Button"
              disabled={!newMeal.name.trim()}
              data-testid="meal-add-button"
            >
              Add
            </button>
          </form>
        </div>
        <div className="MealGrid" data-testid="meal-grid">
          {meals.map((meal) => (
            <div className="MealCard" key={meal.name} data-testid="meal-card">
              <span className="MealCard__Title" data-testid="meal-card-title">
                {meal.name}
              </span>
              <button
                className="MealCard__Delete"
                onClick={() => handleDelete(meal)}
                data-testid="meal-delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AnimatedContent>
  );
}

export default MealsPage;

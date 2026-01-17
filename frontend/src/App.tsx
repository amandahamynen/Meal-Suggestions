import { useState } from "react";
import "./App.css";

interface Meal {
  name: string;
}

function App() {
  const [meal, setMeal] = useState<Meal>({ name: "" });

  return (
    <div className="App">
      <main>
        <h1>I want to eat...</h1>
        <p>{meal.name}</p>
        <button
          onClick={async () => {
            const response = await fetch("http://localhost:8080/meals/random");
            const data = (await response.json()) as Meal;
            setMeal(data);
          }}
        >
          Get a suggestion
        </button>
      </main>
    </div>
  );
}

export default App;

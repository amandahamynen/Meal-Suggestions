import { useState } from "react";
import "./App.css";

interface Meal {
  name: string;
}

function App() {
  const [meal, setMeal] = useState<Meal>({ name: "Press the button..." });

  return (
    <div className="App">
      <div className="content">
        <h1>I should make...</h1>
        <p>{meal.name}</p>
        <button
          className="generate-button"
          onClick={async () => {
            const response = await fetch("http://localhost:8080/meals/random");
            const data = (await response.json()) as Meal;
            setMeal(data);
          }}
        >
          Give a suggestion
        </button>
      </div>
    </div>
  );
}

export default App;

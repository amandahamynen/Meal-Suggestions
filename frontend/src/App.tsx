import { Routes, Route } from "react-router-dom";
import "./App.css";
import MealSuggestion from "./components/MealSuggestion";
import MealsPage from "./components/MealsPage";
import PageLayout from "./layouts/PageLayout";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<MealSuggestion />} />
        <Route path="/meals" element={<MealsPage />} />
      </Route>
    </Routes>
  );
}

export default App;

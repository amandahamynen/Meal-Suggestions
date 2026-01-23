import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MealSuggestion from "../../src/components/MealSuggestion";
import mealService from "../../src/services/meal.service";
import { Meal } from "../../src/types/meal";

vi.mock("../../src/services/meal.service");
vi.mock("../../src/utils/shuffle", () => ({
  default: (data: unknown[]) => data,
}));

const mockMeals: Meal[] = [
  { name: "Lihapullat" },
  { name: "Makaronilaatikko" },
];

describe("MealSuggestion", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows empty state when no meals exist", async () => {
    vi.mocked(mealService.getMeals).mockResolvedValue([]);

    render(<MealSuggestion />);

    expect(await screen.findByText("No meals available")).toBeInTheDocument();

    expect(
      screen.getByText("Add meals to get suggestions"),
    ).toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows placeholder text before button is pressed", async () => {
    vi.mocked(mealService.getMeals).mockResolvedValue(mockMeals);

    render(<MealSuggestion />);

    expect(await screen.findByText("I should make...")).toBeInTheDocument();

    expect(screen.getByText("Press the button")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /give a suggestion/i }),
    ).toBeInTheDocument();
  });

  it("shows first meal on first click", async () => {
    vi.mocked(mealService.getMeals).mockResolvedValue(mockMeals);

    render(<MealSuggestion />);

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    expect(screen.getByText("Lihapullat")).toBeInTheDocument();
  });

  it("cycles through meals on multiple clicks", async () => {
    vi.mocked(mealService.getMeals).mockResolvedValue(mockMeals);

    render(<MealSuggestion />);

    const button = await screen.findByRole("button");

    fireEvent.click(button);
    expect(screen.getByText("Lihapullat")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Makaronilaatikko")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Lihapullat")).toBeInTheDocument();
  });
});

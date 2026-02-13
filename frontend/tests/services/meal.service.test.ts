import mealService from "../../src/services/meal.service";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Meal } from "../../src/types/meal";
import { MEALS_URL } from "../../src/constants/api.constants";

const mockMeals: Meal[] = [
  { name: "Lihapullat" },
  { name: "Makaronilaatikko" },
  { name: "Lämpimät voileivät" },
];

describe("meal.service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch meals successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockMeals,
    } as Response);

    const meals = await mealService.getMeals();
    expect(meals).toEqual(mockMeals);
    expect(fetch).toHaveBeenCalledWith(MEALS_URL);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("should handle empty meal list", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const meals = await mealService.getMeals();
    expect(meals).toEqual([]);
  });

  it("should handle errors when fetching meals", async () => {
    const errorMessage = "Failed to fetch meals";
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    } as Response);

    try {
      await mealService.getMeals();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(errorMessage);
    }
  });

  it("should add a meal successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockMeals[0],
    } as Response);
    const meal = await mealService.addMeal(mockMeals[0]);
    expect(meal).toEqual(mockMeals[0]);
    expect(fetch).toHaveBeenCalledWith(MEALS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockMeals[0]),
    });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("should handle errors when adding a meal", async () => {
    const errorMessage = "Failed to add meal";
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    } as Response);

    try {
      await mealService.addMeal(mockMeals[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(errorMessage);
    }
  });

  it("should delete a meal successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
    } as Response);
    await mealService.deleteMeal(mockMeals[0]);
    expect(fetch).toHaveBeenCalledWith(`${MEALS_URL}/${mockMeals[0]._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("should handle errors when deleting a meal", async () => {
    const errorMessage = "Failed to delete meal";
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    } as Response);

    try {
      await mealService.deleteMeal(mockMeals[0]);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(errorMessage);
    }
  });
});

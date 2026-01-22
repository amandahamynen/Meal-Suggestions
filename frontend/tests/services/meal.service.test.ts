import mealService from "../../src/services/meal.service";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Meal } from "../../src/types/meal";
import { GET_MEALS_URL } from "../../src/constants/api.constants";

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
    expect(fetch).toHaveBeenCalledWith(GET_MEALS_URL);
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
});

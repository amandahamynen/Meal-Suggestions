const getMeals = async () => {
  const response = await fetch("http://localhost:8080/meals");
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  const data = (await response.json()) as { name: string }[];
  return data;
};

export default {
  getMeals,
};

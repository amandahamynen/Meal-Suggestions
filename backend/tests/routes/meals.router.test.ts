import express from "express";
import request from "supertest";
import { createMealsRouter } from "../../src/routes/meals.router";
import { Collection } from "mongodb";
import Meal from "../../src/models/meal";

function createTestApp(mealsCollection?: Partial<Collection<Meal>>) {
  const app = express();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use("/meals", createMealsRouter(mealsCollection as any));
  return app;
}

function mockMealsCollection() {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    deleteOne: jest.fn(),
  };
}

describe("GET /meals", () => {
  it("returns all meals", async () => {
    const mockCollection = mockMealsCollection();

    mockCollection.find.mockReturnValue({
      toArray: jest
        .fn()
        .mockResolvedValue([{ name: "Lihapullat" }, { name: "Italianpata" }]),
    });

    const app = createTestApp(mockCollection);

    const res = await request(app).get("/meals");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ name: "Lihapullat" }, { name: "Italianpata" }]);
  });

  it("returns 500 if db is not initialized", async () => {
    const app = createTestApp(undefined);

    const res = await request(app).get("/meals");

    expect(res.status).toBe(500);
    expect(res.text).toBe("Database not initialized");
  });
});

describe("GET /meals/:id", () => {
  it("returns a meal when found", async () => {
    const mockCollection = mockMealsCollection();
    mockCollection.findOne.mockResolvedValue({ name: "Pakastepizzat" });

    const app = createTestApp(mockCollection);

    const res = await request(app).get("/meals/507f1f77bcf86cd799439022");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ name: "Pakastepizzat" });
  });

  it("returns 404 when not found", async () => {
    const mockCollection = mockMealsCollection();
    mockCollection.findOne.mockResolvedValue(null);

    const app = createTestApp(mockCollection);

    const res = await request(app).get("/meals/507f1f77bcf86cd799439022");

    expect(res.status).toBe(404);
  });

  it("returns 400 for invalid id", async () => {
    const app = createTestApp(mockMealsCollection());

    const res = await request(app).get("/meals/abc123");

    expect(res.status).toBe(400);
  });
});

describe("POST /meals", () => {
  it("creates a meal", async () => {
    const mockCollection = mockMealsCollection();
    mockCollection.insertOne.mockResolvedValue({
      insertedId: "507f1f77bcf86cd799439022",
    });

    const app = createTestApp(mockCollection);

    const res = await request(app)
      .post("/meals")
      .send({ name: "Havaijin pata" });

    expect(res.status).toBe(200);
    expect(res.text).toContain("Havaijin pata");
  });
});

describe("DELETE /meals/:id", () => {
  it("deletes a meal", async () => {
    const mockCollection = mockMealsCollection();
    mockCollection.deleteOne.mockResolvedValue({
      deletedCount: 1,
    });

    const app = createTestApp(mockCollection);

    const res = await request(app).delete("/meals/507f1f77bcf86cd799439022");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Deleted");
  });
});

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Meal from "../models/meal";

export const collections: { meals?: mongoDB.Collection<Meal> } = {};

export async function connectToDatabase() {
  dotenv.config();

  if (!process.env.MONGO_URL) {
    throw new Error(
      "MONGO_URL is not defined in .env file / environment variables",
    );
  }
  if (!process.env.DB_NAME) {
    throw new Error(
      "DB_NAME is not defined in .env file / environment variables",
    );
  }
  if (!process.env.COLLECTION_NAME) {
    throw new Error(
      "COLLECTION_NAME is not defined in .env file / environment variables",
    );
  }

  const client = new mongoDB.MongoClient(process.env.MONGO_URL);

  await client.connect();

  console.log("Connected to MongoDB");
  const db = client.db(process.env.DB_NAME);
  await applySchemaValidation(db);

  const mealsCollection = db.collection<Meal>(process.env.COLLECTION_NAME);

  collections.meals = mealsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${mealsCollection.collectionName}`,
  );
}

async function applySchemaValidation(db: mongoDB.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
      },
    },
  };

  await db
    .command({
      collMod: process.env.COLLECTION_NAME,
      validator: jsonSchema,
    })
    .catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        if (!process.env.COLLECTION_NAME) {
          throw new Error(
            "COLLECTION_NAME is not defined in .env file / environment variables",
          );
        }
        await db.createCollection(process.env.COLLECTION_NAME, {
          validator: jsonSchema,
        });
      }
    });
}

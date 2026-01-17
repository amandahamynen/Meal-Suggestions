import { ObjectId } from "mongodb";

export default interface Meal {
  id?: ObjectId;
  name: string;
}

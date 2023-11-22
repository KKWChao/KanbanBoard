import { v4 as uuidv4 } from "uuid";

export function generateId() {
  // generate random number between 1-10000
  return uuidv4();
}

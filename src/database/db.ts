import { DatabaseSync } from "node:sqlite";

export const data = new DatabaseSync("./data.db");

try{
  

  data.exec(` CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL, 
      age INTEGER NOT NULL
    )`);

  data.close();

}catch(error){

console.error("Database operation failed:", error);
}


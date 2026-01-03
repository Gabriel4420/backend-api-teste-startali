import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const dbPath = process.env.VERCEL 
  ? path.join("/tmp", "data.db") 
  : "./data.db";

export const data = new DatabaseSync(dbPath);

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


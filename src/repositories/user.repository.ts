import type { ZodSafeParseResult } from "zod";
import { data } from "../database/db.ts";
import type { CreateUserDTO, UpdateUserDTO } from "../schema/user.schema.ts";

export class UserRepository {
  // User repository methods will go here
  static findAll() {
    data.open();
    const users = data.prepare("SELECT * FROM user").all();
    data.close();
    return users;
  }

  static findById(id: number) {
    data.open();
    const user = data.prepare("SELECT * FROM user WHERE id = ?").get(id);
    data.close();
    return user;
  }

  static addUser(info: CreateUserDTO) {
    data.open();
    const stmt = data.prepare(
      "INSERT INTO user (name, email, age) VALUES (?, ?, ?)"
    );
    const result = stmt.run(info.name, info.email, info.age);
    data.close();
    return result;
  }

  static updateUser(info: UpdateUserDTO, id: number) {
    data.open();
    let query = "UPDATE user SET ";
    const params: (string | number)[] = [];

    if (info.name) {
      query += "name = ?, ";
      params.push(info.name);
    }
    if (info.email) {
      query += "email = ?, ";
      params.push(info.email);
    }
    if (info.age) {
      query += "age = ?, ";
      params.push(info.age);
    }
      

    query = query.slice(0, -2); // Remove the last comma and space
    query += " WHERE id = ?";
    params.push(id);

    const stmt = data.prepare(query);
    const result = stmt.run(...params);
    data.close();
    return result;
  }

  static deleteUser(id: number) {
    data.open();
    const stmt = data.prepare("DELETE FROM user WHERE id = ?");
    const info = stmt.run(id);
    data.close();
    return info;
  }
}
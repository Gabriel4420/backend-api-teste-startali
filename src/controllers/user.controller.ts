import type { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.ts";
import { createUserSchema, updateUserSchema } from "../schema/user.schema.ts";

export class UserController {
    static listUsers(_req: Request, res: Response) {
        const users = UserRepository.findAll();
        return res.json({ message: "Lista de usuários", users });

    }

    static getUser(req: Request, res: Response) {
        const userId = req.params.id;
        const user = UserRepository.findById(Number(userId));
        return !user ? res.status(404).json({ message: "Usuário não encontrado" }) : res.json({ message: "Detalhes do usuário", user });
    }

    static createUser(req: Request, res: Response) {
        const parseResult = createUserSchema.safeParse(req.body);

        if (!parseResult.success) {
          return res.status(400).json({
            message: "Erro de validação",
            errors: parseResult.error.format(),
          });
        }

        const user = UserRepository.addUser(parseResult.data);

        return res.status(201).json({ message: "Usuario criado", user });
    }

    static updateUser(req: Request, res: Response) {
        const userId = req.params.id;
        const updatedData = updateUserSchema.safeParse(req.body);

        if (!updatedData.success) {
          return res.status(400).json({
            message: "Erro de validação",
            errors: updatedData.error.format(),
          });
        }

        const updatedUser = UserRepository.updateUser(
          updatedData.data, Number(userId)
        );
        return !updatedUser ? res.status(404).json({ message: "User not found" }) : res.json({ message: "User updated", updatedUser });
    }


    static deleteUser(req: Request, res: Response) {
        const userId = req.params.id;
        const success = UserRepository.deleteUser(Number(userId));
        return !success ? res.status(404).json({ message: "User not found" }) : res.json({ message: "User deleted" });
    }


  }
import {z} from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  age: z
    .number("A idade deve ser um número")
    .int("A idade deve ser um número inteiro")
    .positive("A idade deve ser um número positivo")
    .min(1, "A idade deve ser no minimo 1"),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
  age: z.number().int().positive().min(1, "A idade deve ser um número positivo").optional(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";
import { validate } from "../middlewares/validate.ts";
import { createUserSchema } from "../schema/user.schema.ts";

const router = Router();

router.get("/users", UserController.listUsers);
router.get("/users/:id", UserController.getUser);
router.post("/users", validate(createUserSchema), UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;

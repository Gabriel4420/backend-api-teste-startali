import { jest, describe, expect, beforeEach, it } from "@jest/globals";
import type { Request, Response } from "express";

// Mocking before imports
jest.unstable_mockModule("../repositories/user.repository.ts", () => ({
  UserRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    addUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
  __esModule: true,
}));

// Dynamic imports
const { UserController } = await import("../controllers/user.controller.ts");
const { UserRepository } = await import("../repositories/user.repository.ts");

describe("UserController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn().mockReturnValue({});
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockRequest = {};
    mockResponse = {
      json: jsonMock,
      status: statusMock,
    } as unknown as Partial<Response>;
    jest.clearAllMocks();
  });

  describe("listUsers", () => {
    it("Deve Retornar todos os usuários", () => {
      const mockUsers = [
        { id: 1, name: "Gabriel", email: "gabriel_rodrigues@hotmail.com", age: 30 },
        { id: 2, name: "Jessica", email: "Jessica@gmail.com", age: 25 },
      ];
      (UserRepository.findAll as jest.Mock).mockReturnValue(mockUsers);

      UserController.listUsers(mockRequest as Request, mockResponse as Response);

      expect(jsonMock).toHaveBeenCalledWith({
        message: "Lista de usuários",
        users: mockUsers,
      });
    });
  });

  describe("getUser", () => {
    it("Deve Retornar um usuário por ID", () => {
      const mockUser = { id: 1, name: "Gabriel", email: "gabriel_rodrigues@hotmail.com", age: 30 };
      mockRequest.params = { id: "1" };
      (UserRepository.findById as jest.Mock).mockReturnValue(mockUser);

      UserController.getUser(mockRequest as Request, mockResponse as Response);

      expect(UserRepository.findById).toHaveBeenCalledWith(1);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Detalhes do usuário",
        user: mockUser,
      });
    });

    it("Deve Retornar 404 quando o usuário não for encontrado", () => {
      mockRequest.params = { id: "999" };
      (UserRepository.findById as jest.Mock).mockReturnValue(null);

      UserController.getUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Usuário não encontrado",
      });
    });
  });

  describe("createUser", () => {
    it("Deve Criar um novo usuário com dados válidos", () => {
      const userData = { name: "Gabriel", email: "gabriel_rodrigues@test.com", age: 30 };
      const createdUser = { id: 1, ...userData };
      mockRequest.body = userData;
      (UserRepository.addUser as jest.Mock).mockReturnValue(createdUser);

      UserController.createUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Usuario criado",
        user: createdUser,
      });
    });

    it("Deve Retornar 400 com nome inválido", () => {
      mockRequest.body = { name: "Joel", email: "gabriel_rodrigues@test.com", age: 30 };

      UserController.createUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Erro de validação" })
      );
    });

    it("Deve Retornar 400 com email inválido", () => {
      mockRequest.body = { name: "Gabriel", email: "gabriel_rodrigues@invalid-email", age: 30 };

      UserController.createUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Erro de validação" })
      );
    });

    it("Deve Retornar 400 com idade inválida", () => {
      mockRequest.body = { name: "Gabriel", email: "gabriel_rodrigues@test.com", age: -5 };

      UserController.createUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Erro de validação" })
      );
    });
  });

  describe("updateUser", () => {
    it("Deve Atualizar um usuário existente", () => {
      const updateData = { name: "Gabriel", email: "gabriel_rodrigues@test.com" };
      const updatedUser = { id: 1, ...updateData, age: 30 };
      mockRequest.params = { id: "1" };
      mockRequest.body = updateData;
      (UserRepository.updateUser as jest.Mock).mockReturnValue(updatedUser);

      UserController.updateUser(mockRequest as Request, mockResponse as Response);

      expect(UserRepository.updateUser).toHaveBeenCalledWith(updateData, 1);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "User updated",
        updatedUser,
      });
    });

    it("Deve Retornar 404 quando o usuário não for encontrado na atualização", () => {
      mockRequest.params = { id: "999" };
      mockRequest.body = { name: "Gabriel" };
      (UserRepository.updateUser as jest.Mock).mockReturnValue(null);

      UserController.updateUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Usuario não encontrado",
      });
    });

    it("Deve Retornar 400 com dados de atualização inválidos", () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Jo" };

      UserController.updateUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Erro de validação" })
      );
    });
  });

  describe("deleteUser", () => {
    it("Deve Deletar um usuário com sucesso", () => {
      mockRequest.params = { id: "1" };
      (UserRepository.deleteUser as jest.Mock).mockReturnValue(true);

      UserController.deleteUser(mockRequest as Request, mockResponse as Response);

      expect(UserRepository.deleteUser).toHaveBeenCalledWith(1);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Usuario deletado" });
    });

    it("Deve Retornar 404 quando o usuário não for encontrado na exclusão", () => {
      mockRequest.params = { id: "999" };
      (UserRepository.deleteUser as jest.Mock).mockReturnValue(false);

      UserController.deleteUser(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Usuario não encontrado" });
    });
  });
});

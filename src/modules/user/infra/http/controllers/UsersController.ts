import CreateUserService from '@modules/user/services/CreateUserService';
import DeleteUserService from '@modules/user/services/DeleteUserService';
import UpdateUserService from '@modules/user/services/UpdateUserService';
import GetOneUserService from '@modules/user/services/GetOneUserService';
import GetAllUsersService from '@modules/user/services/GetAllUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response) {
    const {
      cpf, password, name, id, phone, created_at, updated_at,
    } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.run({
      cpf, id, name, password, phone, created_at, updated_at,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      cpf, password, name, phone, created_at, updated_at,
    } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.run({
      cpf, id, name, password, phone, created_at, updated_at,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.run({ id });

    res.json('Usuário deletado.');
  }

  public async getAll(req: Request, res: Response) {
    const getAllUsersService = container.resolve(GetAllUsersService);

    const users = await getAllUsersService.run();

    const usersWithoutPassword = users?.map((user) => {
      const { password: _, ...userWithoutPassword } = user || {};
      return userWithoutPassword;
    });
    res.json(usersWithoutPassword);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const getOneUserService = container.resolve(GetOneUserService);

    const user = await getOneUserService.run({ id });

    const { password: _, ...userWithoutPassword } = user || {};

    res.json(userWithoutPassword);
  }
}

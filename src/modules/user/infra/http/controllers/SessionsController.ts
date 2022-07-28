import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cpf, password } = req.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.run({ cpf, password });

    const { password: _, ...userWithoutPassword } = user;

    return res.json({ user: userWithoutPassword, token });
  }
}

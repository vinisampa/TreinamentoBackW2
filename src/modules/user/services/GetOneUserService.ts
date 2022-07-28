import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/iUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class GetOneUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ id }: IRequest): Promise<User | null> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.');
    }

    const user = await this.usersRepository.getOne({ id });

    return user;
  }
}

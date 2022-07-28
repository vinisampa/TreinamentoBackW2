import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/iUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ id }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.');
    }

    await this.usersRepository.delete({ id });
  }
}

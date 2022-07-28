import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/iUsersRepository';

@injectable()
export default class GetAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run(): Promise<User[] | null> {
    const users = await this.usersRepository.getall();

    return users;
  }
}

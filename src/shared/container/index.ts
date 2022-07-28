import UsersRepository from '@modules/user/infra/prisma/repositories/UsersRepository';
import IUsersRepository from '@modules/user/repositories/iUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

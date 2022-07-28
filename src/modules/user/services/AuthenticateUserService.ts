import auth from '@config/auth';
import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign, Secret } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/iUsersRepository';

interface IRequest {
  cpf: string,
  password: string,
}

interface IResponse {
  user: User,
  token: string,
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ cpf, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByCpf(cpf);
    if (!user) {
      throw new AppError('Credenciais incorretas');
    }

    const { expiration, secret } = auth.jwt;

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Credenciais incorretas');
    }

    const token = sign({}, secret as Secret, {
      subject: user.id,
      expiresIn: expiration,
    });

    return {
      user,
      token,
    };
  }
}

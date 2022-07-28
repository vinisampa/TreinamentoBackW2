import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import IUsersRepository from '../repositories/iUsersRepository';

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  password: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({
    name, password, cpf, phone, created_at, updated_at, id,
  }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.');
    }

    if (!name) { // Nome vazio
      throw new AppError('Não é possível atualizar usuário com nome vazio.');
    } else if (!password) { // Nacismento vazio
      throw new AppError('Não é possível atualizar usuário sem senha.');
    } else if (!cpf) { // CPF vazio
      throw new AppError('Não é possível atualizar usuário sem cpf.');
    } else if (!phone) { // Telefone vazio
      throw new AppError('Não é possível atualizar usuário sem telefone');
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.update({
      name,
      password: hashedPassword,
      cpf,
      phone,
      created_at,
      updated_at,
      id,
    });

    return user;
  }
}

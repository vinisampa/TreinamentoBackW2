import ICreateUserDTO from '@modules/user/dtos/iCreateUserDTO';
import IDeleteUserDTO from '@modules/user/dtos/iDeleteUserDTO';
import IUpdateUserDTO from '@modules/user/dtos/iUpdateUserDTO';
import IGetOneUserDTO from '@modules/user/dtos/iGetOneUserDTO';
import IUsersRepository from '@modules/user/repositories/iUsersRepository';
import { User } from '@prisma/client';
import client from '@shared/infra/prisma/client';

export default class UsersRepository implements IUsersRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = client.user;
  }

  public async create({
    cpf, created_at, id, name, password, phone, updated_at,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.prismaClient.create({
      data: {
        cpf, name, password, phone, created_at, id, updated_at,
      },
    });
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { cpf } });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { id } });

    return user;
  }

  public async update({
    cpf, created_at, id, name, password, phone, updated_at,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.prismaClient.update({
      where: {
        id,
      },
      data: {
        cpf, name, password, phone, created_at, updated_at,
      },
    });
    return user;
  }

  public async delete({ id }: IDeleteUserDTO): Promise<void> {
    await this.prismaClient.delete({ where: { id } });
  }

  public async getOne({ id }: IGetOneUserDTO): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { id } });

    return user;
  }

  public async getall(): Promise<User[] | null> {
    const users = await this.prismaClient.findMany();

    return users;
  }
}

import { User } from '@prisma/client';
import ICreateUserDTO from '../dtos/iCreateUserDTO';
import IUpdateUserDTO from '../dtos/iUpdateUserDTO';
import IDeleteUserDTO from '../dtos/iDeleteUserDTO';
import IGetOneUserDTO from '../dtos/iGetOneUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByCpf(cpf: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(data: IUpdateUserDTO): Promise<User>;
  delete(data: IDeleteUserDTO): void;
  getOne(data: IGetOneUserDTO): Promise<User | null>;
  getall(): Promise<User[] | null>;
}

export default IUsersRepository;

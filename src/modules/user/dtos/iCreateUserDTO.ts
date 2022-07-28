interface ICreateUserDTO {
  id: string;
  name: string;
  password: string;
  cpf: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export default ICreateUserDTO;

interface IUpdateUserDTO {
  id: string;
  name: string;
  password: string;
  cpf: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export default IUpdateUserDTO;

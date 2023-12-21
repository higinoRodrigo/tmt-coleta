export const initialValues: IValuesPerfil = {
  identificador: "",
  nome: "",
  email: "",
  cpf: "",
  cnh: "",
  validadeCnh: "",
  fone: "",
  senha: "",
  confirmarSenha: "",
  foto: null
};

export interface IValuesPerfil {
  identificador: string;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  validadeCnh: string;
  fone: string;
  senha: string;
  confirmarSenha: string;
  foto?: any;
}
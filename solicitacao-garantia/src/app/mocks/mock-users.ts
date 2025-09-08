export interface User {
  email: string;
  senha: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  celular: string;
  genero: string;
}

export const USERS: User[] = [
  {
    email: 'antonio@gmail.com',
    senha: '123456',
    nome: 'Antonio Silva',
    dataNascimento: '15/05/1990',
    cpf: '123.456.789-00',
    celular: '(11) 99999-1111',
    genero: 'Masculino'
  },
  {
    email: 'maria@gmail.com',
    senha: '654321',
    nome: 'Maria Souza',
    dataNascimento: '22/03/1985',
    cpf: '987.654.321-00',
    celular: '(21) 98888-2222',
    genero: 'Feminino'
  }
];

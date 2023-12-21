export default interface Usuario {
  uid: string
  email: string
  name: string
  cpf: string
}

export enum StatusEnvioNota {
  AGUARDANDO = "Aguardando",
  ENVIADO = "Enviado",
  ERRO = "Erro",
  DEFAULT = "Default",
}
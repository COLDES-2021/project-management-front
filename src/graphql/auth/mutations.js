import { gql } from '@apollo/client';

const REGISTRAR_USUARIO = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Listado_Rol!
    $password: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login(
    $correo: String!, 
    $password: String!) {
    login(
      correo: $correo, 
      password: $password
    ) {
      token
      error
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRAR_USUARIO, LOGIN, REFRESH_TOKEN };
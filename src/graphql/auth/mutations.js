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

const VALIDATE_TOKEN = gql`
  mutation ValidateToken {
    validateToken {
      token
      error
    }
  }
`;

export { REGISTRAR_USUARIO, LOGIN, VALIDATE_TOKEN };
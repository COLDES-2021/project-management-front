import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        nombre
        apellido
        correo
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const PROYECTO = gql`
  query Proyectos($_id: String!) {
    Proyectos(_id: $_id) {
        _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        nombre
        apellido
        correo
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS, PROYECTO };

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Listado_Rol, Listado_EstadoUsuario } from 'utils/listados';

const ListarUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);
  const [busqueda, setBusqueda] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(usuarios);

	useEffect(() => {
		setUsuariosFiltrados(
			usuarios.filter((elemento) => {
				return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
			})
		);
	}, [busqueda, usuarios]);

  useEffect(() => {
    console.log('data servidor', data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <div className='w-11/12'>
      <div className='flex justify-evenly'>
        <div className=' my-4 p-2 w-4/6'>
          <span className='p-2 w-full text-2xl'>Listado de Usuarios</span>
        </div>
        <div className=' w-2/6 flex items-center'>
          <div className='w-full flex justify-end items-center'>
						//puedo eliminar esto después
          </div>
        </div>
      </div>
      <div className='w-full h-full flex flex-col overflow-hidden'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-4'>
              <div className='my-3 row flex flex-row items-center'>
                <h1 className='mr-5'>Búsqueda</h1>
                <input type='text' id='id_producto' className='inputSearch' value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Ingrese búsqueda" />
              </div>
              <table className='tabla'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Identificación</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Usuarios.map((u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u.nombre}</td>
                          <td>{u.apellido}</td>
                          <td>{u.correo}</td>
                          <td>{u.identificacion}</td>
                          <td>{Listado_Rol[u.rol]}</td>
                          <td>{Listado_EstadoUsuario[u.estado]}</td>
                          <td>
                            <Link to={`/usuarios/editar/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarUsuarios;

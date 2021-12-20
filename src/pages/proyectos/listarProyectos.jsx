import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Listado_EstadoProyecto } from 'utils/listados';
import PageTitle from 'components/PageTitle';
import PrivateRoute from 'components/PrivateRoute';
import { Listado_FaseProyecto } from 'utils/listados';
import { Button } from '@material-ui/core';

const ListarProyectos = () => {
    const { data, error, loading } = useQuery(PROYECTOS);

    // const [busqueda, setBusqueda] = useState('');
    // const [proyectos, setProyectos] = useState([]);
    // const [proyectosFiltrados, setProyectosFiltrados] = useState(proyectos);

    // useEffect(() => {
    //   setProyectosFiltrados(
    //     proyectos.filter((elemento) => {
    //       return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
    //     }));
    // }, [busqueda, proyectos]);

    // useEffect(() => { console.log('data servidor', data) }, [data]);

    useEffect(() => {
        if (error) {
            toast.error('Error consultando los proyectos')
        }
    }, [error]);

    if (loading) return <div>Cargando....</div>;

    return (
        <PrivateRoute roleList={['Administrador']}>
            <div className='w-11/12'>
                <PageTitle Titulo="Proyectos" Ruta='/' />
                <div className='w-full flex justify-start items-center'>
                    {/* disponible */}
                    <Link to='/proyectos/nuevoProyecto'>
                        <button className='normalButton'>
                            <i className='fas fa-plus text-white cursor-pointer font-bold text-xl' />
                            <span className='mx-3'>Crear Proyecto</span>
                        </button>
                    </Link>
                </div>

                <div className='w-full h-full flex flex-col overflow-hidden'>
                    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-4'>
                                {/* <div className='my-3 row flex flex-row items-center'>
                <h1 className='mr-5'>Búsqueda</h1>
                <input type='text' id='id_producto' className='inputSearch' value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="No Funciona Ingrese búsqueda" />
              </div> */}
                                <table className='tabla'>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Presupuesto</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Fin</th>
                                            <th>Estado</th>
                                            <th>Fase</th>
                                            <th>Lider</th>
                                            <th>Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.Proyectos.map((u) => {
                                                return (
                                                    <tr key={u._id}>
                                                        <td>{u.nombre}</td>
                                                        <td>{u.presupuesto}</td>
                                                        <td>{u.fechaInicio}</td>
                                                        <td>{u.fechaFin}</td>
                                                        <td>{Listado_EstadoProyecto[u.estado]}</td>
                                                        <td>{Listado_FaseProyecto[u.fase]}</td>
                                                        <td>{u.lider.nombre} {u.lider.apellido}</td>
                                                        <td>
                                                            <Link to={`/proyectos/editar/${u._id}`}>
                                                                <i className='fas fa-pen pencilEdit mx-3' />
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
        </PrivateRoute>

    );
};

export default ListarProyectos;

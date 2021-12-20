import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation, useQuery } from '@apollo/client';
import PageTitle from 'components/PageTitle';
import LittleTitle from 'components/LittleTitle';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import DropDown from 'components/Dropdown';
import { Listado_TipoObjetivo } from 'utils/listados';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';

const NuevoProyecto = () => {
    const { form, formData, updateFormData } = useFormData();
    const [listaUsuarios, setListaUsuarios] = useState({});
    const { data, loading, error } = useQuery(GET_USUARIOS, {
        variables: {
            filtro: { rol: 'Lider', estado: 'Autorizado' },
        },
    });

    const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_PROYECTO);

    useEffect(() => {
        console.log(data);
        if (data) {
            const lu = {};
            data.Usuarios.forEach((elemento) => {
                lu[elemento._id] = elemento.correo;
            });
            setListaUsuarios(lu);
        }
    }, [data]);

    useEffect(() => {
        console.log('data mutation', mutationData);
    });

    const submitForm = (e) => {
        e.preventDefault();

        formData.objetivos = Object.values(formData.objetivos);
        formData.presupuesto = parseFloat(formData.presupuesto);

        crearProyecto({
            variables: formData,
        });
    };

    if (loading) return <div>...Loading</div>;

    return (
        <div>
            <PageTitle Titulo={"Nuevo Proyecto"} Ruta='/proyectos' />
            <div className='grid justify-items-center'>
                <LittleTitle ltitle="Ingresar Información" />
                <div className='my-3'>
                    <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                        <div className='shadow overflow-hidden sm:rounded-md p-3'>
                            <div className='grid grid-cols-1'>
                                <div>
                                    <Input label='Nombre' type='text' name='nombre' required={true} />
                                    <Input label='Presupuesto' type='float' name='presupuesto' required={true} />
                                    <Input label='Fecha Inicio' type='date' name='fechaInicio' required={true} />
                                    <Input label='Fecha Fin' type='date' name='fechaFin' required={false} />
                                    <DropDown label='Correo Líder' options={listaUsuarios} name='lider' required={true} />
                                    <Objetivos />
                                    <div className=" flex justify-center my-2">
                                        <ButtonLoading disabled={false} loading={false} text='Crear Proyecto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

const Objetivos = () => {
    const [listaObjetivos, setListaObjetivos] = useState([]);
    const [maxObjetivos, setMaxObjetivos] = useState(false);

    const eliminarObjetivo = (id) => {
        setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
    };

    const componenteObjetivoAgregado = () => {
        const id = nanoid();
        return <FormObjetivo key={id} id={id} />;
    };

    useEffect(() => {
        if (listaObjetivos.length > 4) {
            setMaxObjetivos(true);
        } else {
            setMaxObjetivos(false);
        }
    }, [listaObjetivos]);

    return (
        <ObjContext.Provider value={{ eliminarObjetivo }}>
            <div className='grid grid-cols-2'>
                <span>Objetivos del Proyecto</span>
                {!maxObjetivos && (
                    <button className='normalButton' onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}>
                        <i  className='fas fa-plus cursor-pointer mx-1' />
                        <span className='mx-3'>Crear Objetivo</span>
                    </button>
                )}
            </div>
            <div>
                {listaObjetivos.map((objetivo) => {
                    return objetivo;
                })}
            </div>
        </ObjContext.Provider>
    );
};

const FormObjetivo = ({ id }) => {
    const { eliminarObjetivo } = useObj();
    return (
        <div className='grid grid-cols-1 py-2'>
            <div className='shadow overflow-hidden sm:rounded-md p-3'>
                <Input name={`nested||objetivos||${id}||descripcion`} label='Descripción' type='text' required={true} />
                <DropDown name={`nested||objetivos||${id}||tipo`} options={Listado_TipoObjetivo} label='Tipo de Objetivo' required={true} />
                <div className='flex justify-end'> 
                    <button className='deleteButton'onClick={() => eliminarObjetivo(id)} >
                        <i className='fas fa-minus cursor-pointer mx-1' />
                        <span className='mx-3'>Eliminar Objetivo</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NuevoProyecto;
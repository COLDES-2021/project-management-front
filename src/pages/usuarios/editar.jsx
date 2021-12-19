import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Listado_EstadoUsuario } from 'utils/listados';
import PageTitle from 'components/PageTitle';
import InputDisabled from 'components/InputDisabled';
import LittleTitle from 'components/LittleTitle';

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='w-11/12'>
      <PageTitle Titulo={"Usuarios"} Ruta='/usuarios' />

      <div className='grid justify-items-center'>
        <LittleTitle ltitle="Editar Usuario"/>
        <div className='my-3'>
          <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
            <div className='shadow overflow-hidden sm:rounded-md p-3'>
              <div className='grid grid-cols-1'>
                <div>
                  <Input label='Nombre' type='text' name='nombre' defaultValue={queryData.Usuario.nombre} required={true}/>
                  <Input label='Apellido' type='text' name='apellido' defaultValue={queryData.Usuario.apellido} required={true}/>
                  <Input label='Correo' type='email' name='correo' defaultValue={queryData.Usuario.correo} required={true} />
                  <Input label='Identificación' type='text' name='identificacion' defaultValue={queryData.Usuario.identificacion}/>
                  <DropDown label='Estado' name='estado' defaultValue={queryData.Usuario.estado} required={true} options={Listado_EstadoUsuario}/>
                  <InputDisabled label='Rol de Usuario' type='text' name='rol' defaultValue={queryData.Usuario.rol} required={false}/>
                  <div className=" flex justify-center my-2">
                    <ButtonLoading disabled={Object.keys(formData).length === 0} loading={mutationLoading} text='Confirmar' />
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

export default EditarUsuario;

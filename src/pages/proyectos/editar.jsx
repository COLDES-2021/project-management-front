import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import DropDown from 'components/Dropdown';
import { Listado_EstadoProyecto } from 'utils/listados';
import PageTitle from 'components/PageTitle';
import InputDisabled from 'components/InputDisabled';
import LittleTitle from 'components/LittleTitle';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { Listado_FaseProyecto } from 'utils/listados';
import { PROYECTO } from 'graphql/proyectos/queries';

const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(PROYECTO, {
    variables: { _id },
  });

  const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    // delete formData.rol;
    editarProyecto({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el proyecto');
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='w-11/12'>
      <PageTitle Titulo={"Proyectos"} Ruta='/proyectos' />

      <div className='grid justify-items-center'>
        <LittleTitle ltitle="Editar Proyecto"/>
        <div className='my-3'>
          <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
            <div className='shadow overflow-hidden sm:rounded-md p-3'>
              <div className='grid grid-cols-1'>
                <div>
                  <Input label='Nombre' type='text' name='nombre' defaultValue={queryData.Proyecto.nombre} required={true}/>
                  <Input label='Presupuesto' type='float' name='presupuesto' defaultValue={queryData.Proyecto.presupuesto} required={true}/>
                  <Input label='Fecha Inicio' type='date' name='fechaInicio' defaultValue={queryData.Proyecto.fechaInicio} required={true} />
                  <Input label='Fecha Fin' type='date' name='fechaFin' defaultValue={queryData.Proyecto.fechaFin} required={true} />
                  <DropDown label='Estado' name='estado' defaultValue={queryData.Proyecto.estado} required={true} options={Listado_EstadoProyecto}/>
                  <DropDown label='Fase' name='fase' defaultValue={queryData.Proyecto.fase} required={true} options={Listado_FaseProyecto}/>
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

export default EditarProyecto;
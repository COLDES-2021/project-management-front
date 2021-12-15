import PageTitle from 'components/PageTitle'
import LittleTitle from 'components/LittleTitle';
import React, { useEffect } from 'react'
import { Listado_Rol } from 'utils/listados';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import { REGISTRAR_USUARIO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/authContext';

const Register = () => {

    const { form, formData, updateFormData } = useFormData();
    const { setToken } = useAuth();
    const navigate = useNavigate();
    
    const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(REGISTRAR_USUARIO);

    const submitForm = (e) => {
        e.preventDefault();
        console.log('Enviar al backend', formData);
        registro({ variables: formData });
    };

    useEffect(() => {
        console.log('data mutation', dataMutation);
        if (dataMutation) {
          if (dataMutation.registro.token) {
            setToken(dataMutation.registro.token);
            navigate('/');
          }
        }
      }, [dataMutation, setToken, navigate]);

    return (
        <div>
            <PageTitle Titulo={"Registro"} Ruta='/' />

            <div className='grid justify-items-center'>
                <LittleTitle ltitle="Datos" />
                <div className='my-3'>
                    <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                        <div className='shadow overflow-hidden sm:rounded-md p-3'>
                            <div className='grid grid-cols-1'>
                                <div>
                                    <Input label='Documento' name='identificacion' type='text' required />
                                    <Input label='Nombre' name='nombre' type='text' required />
                                    <Input label='Apellido' name='apellido' type='text' required />
                                    <Input label='Correo' name='correo' type='email' required />
                                    <Input label='Contraseña' name='password' type='password' required />
                                    <DropDown label='Rol de usuario' name='rol' required={true} options={Listado_Rol} />
                                    <div className=" flex justify-center my-2">
                                        <ButtonLoading disabled={Object.keys(formData).length === 0} loading={false} text='Registrar' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <span>¿Ya tienes una cuenta?</span>
                    <Link to='/auth/login'>
                        <button className='searchButton'>Iniciar Sesión</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register

import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import PageTitle from 'components/PageTitle';
import LittleTitle from 'components/LittleTitle';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { form, formData, updateFormData } = useFormData();

    const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
        useMutation(LOGIN);

    const submitForm = (e) => {
        e.preventDefault();
        login({
            variables: formData,
        });
    };

    useEffect(() => {
        if (dataMutation) {
            if (dataMutation.login.token) {
                setToken(dataMutation.login.token);
                navigate('/');
            } else{
                navigate('/auth/register');
            }
        }
    }, [dataMutation, setToken, navigate]);

    return (
        <div>
            <PageTitle Titulo={"Login"} Ruta='/' />

            <div className='grid justify-items-center'>
                <LittleTitle ltitle="Datos" />
                <div className='my-3'>
                    <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                        <div className='shadow overflow-hidden sm:rounded-md p-3'>
                            <div className='grid grid-cols-1'>
                                <div>
                                    <Input name='correo' type='email' label='Correo' required={true} />
                                    <Input name='password' type='password' label='Contraseña' required={true} />
                                    <div className=" flex justify-center my-2">
                                        <ButtonLoading disabled={Object.keys(formData).length === 0} loading={mutationLoading} text='Iniciar Sesión' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <span>No tienes una cuenta?</span>
                    <Link to='/auth/register'>
                        <button className='searchButton'>Registrarse</button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Login;
import React, { useEffect, useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Index from 'pages/Index';
import ListarUsuarios from 'pages/usuarios/listarUsuarios';
import EditarUsuario from 'pages/usuarios/editar';
import 'styles/globals.css';
import 'styles/tabla.css';
import 'styles/styles.css'
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from 'jwt-decode';
import ListarProyectos from 'pages/proyectos/listarProyectos';
import EditarProyecto from 'pages/proyectos/editar';
import NuevoProyecto from 'pages/proyectos/nuevoProyecto';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  // uri: servidor desplegado nov 30
});

const authLink = setContext((_, { headers }) => {

  // Obtener token de almacenamiento local si este existe

  const token = JSON.parse(localStorage.getItem('token'));

  // Retornar el contexto a los headers para que httpLink lo pueda leer

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<ListarUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/proyectos' element={<ListarProyectos />} />
                <Route path='/proyectos/nuevoProyecto' element={<NuevoProyecto />} />
                <Route path='/proyectos/editar/:_id' element={<EditarProyecto />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider >
  );
}

export default App;

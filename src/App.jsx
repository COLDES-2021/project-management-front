import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Index from 'pages/Index';
import Page2 from 'pages/Page2';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import ListarUsuarios from 'pages/usuarios/listarUsuarios';
import EditarUsuario from 'pages/usuarios/editar';
import 'styles/globals.css';
import 'styles/tabla.css';
import 'styles/styles.css'
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  };

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
                <Route path='page2' element={<Page2 />} />
                <Route path='category1' element={<IndexCategory1 />} />
                <Route path='category1/page1' element={<Category1 />} />
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

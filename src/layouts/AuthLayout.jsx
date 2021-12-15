import { Outlet } from 'react-router';
import React from 'react';

const AuthLayout = () => {
    return (
        <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
          <div className='flex w-full h-full'>
            <div className='w-full h-full  overflow-y-scroll'>
                Layout de autenticación
              <Outlet />
            </div>
          </div>
        </div>
      );
}

export default AuthLayout

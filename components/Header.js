import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';



const OBTENER_USUARIO = gql`
    query ObtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
            email
            creado
        }   
    }
`;
const Header = () => {
    const {data, loading, error} = useQuery(OBTENER_USUARIO);

    //Routing
    const router = useRouter();

    //Proteger que no accedamos a data antes de tener resultados
    if(loading) return null;
    if(!data.obtenerUsuario) {
        router.push('/login');

    }

    //si no hay informacion
    const { nombre, apellido } = data.obtenerUsuario ?? {};
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login')
    }
  return (
    <div className='sm:flex sm:justify-between mb-6'>
        <p className='mr-2 mb-5 lg:mb-0'>Hola, {nombre} {apellido}</p>

        <button 
            onClick={ () => cerrarSesion() }
            type='button'
            className='bg-blue-800 hover:bg-gray-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
        >
            Cerrar Sesión
        </button>
    </div>
  )
}

export default Header
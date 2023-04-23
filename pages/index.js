import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import { FaSync } from 'react-icons/fa';
import Cliente from '../components/Cliente';


const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      email
      empresa
      telefono
      vendedor
    }
  }

`;

const Index = () => {

  //Consulta de apollo

  const { data, loading: sessionLoading, error} =useQuery(OBTENER_CLIENTES_USUARIO,{ fetchPolicy: 'cache-and-network'},);

  // Routing
  const router = useRouter();

  if (sessionLoading) return <p>Cargando...</p>
  
  if(!data || !data.obtenerClienteVendedor) {
    router.push('/login');
    return null;
  }
  const reFetch = () => {
    router.push('/');
  }
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'> Clientes </h1>
        <div className="sm:flex sm:w-full">
          <Link href="/nuevocliente">
            <p className='bg-blue-800 py-2 px-5 mt-3 mr-2 text-sm hover:bg-gray-800 mb-3 uppercase font-bold inline-block text-white rounded w-full text-center'> Nuevo Cliente</p>
          </Link>
        
        </div>
        <div className='overflow-x-scroll'>
          <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Nombre</th>
                <th className='w-1/5 py-2'>Empresa</th>
                <th className='w-1/5 py-2'>Email</th>
                <th className='w-1/5 py-2'>Eliminar</th>
                <th className='w-1/5 py-2'>Editar</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              
              {data.obtenerClienteVendedor && data.obtenerClienteVendedor.map( cliente => (
                <Cliente 
                  key={cliente.id}
                  cliente={cliente}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}

export default Index
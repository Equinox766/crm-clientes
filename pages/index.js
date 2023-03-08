import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';


const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerPedidos {
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

  const { data, loading: sessionLoading, error} =useQuery(OBTENER_CLIENTES_USUARIO);

  // Routing
  const router = useRouter();

  if (sessionLoading) return <p>Cargando...</p>
  
  if(!data.obtenerClienteVendedor) {
    router.push('/login');
    return null
  }
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'> Clientes </h1>
        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Nombre</th>
              <th className='w-1/5 py-2'>Empresa</th>
              <th className='w-1/5 py-2'>Email</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {data.obtenerClienteVendedor.map( cliente => (
              <tr key={cliente.id}>
                <td className='border px-4 py-2'>{ cliente.nombre } { cliente.apellido }</td>
                <td className='border px-4 py-2'>{ cliente.empresa }</td>
                <td className='border px-4 py-2'>{ cliente.email }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Index
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import Producto from '../components/Producto';



//QUERY PARA OBTENER PRODUCTOS
const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
      obtenerProductos {
          id
          nombre
          existencia
          precio
          creado
      }                       
  }
`;

const productos = () => {
  //Consultar productos 
  const {data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  //Routing
  const router = useRouter();
  if(loading) return "Cargando..."

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'> Productos </h1>
        <div className="flex">
          <Link href="/nuevoproducto">
            <p className='bg-blue-800 py-2 px-5 mt-3 mr-2 text-sm hover:bg-gray-800 mb-3 uppercase font-bold inline-block text-white rounded '> Nuevo Producto</p>
          </Link>
        
        </div>
        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Producto</th>
              <th className='w-1/5 py-2'>Stock</th>
              <th className='w-1/5 py-2'>Precio</th>
              <th className='w-1/5 py-2'>Eliminar</th>
              <th className='w-1/5 py-2'>Editar</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            
            {data.obtenerProductos.map( producto => (
              <Producto 
                key={producto.id}
                producto={producto}
              />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default productos
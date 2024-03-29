import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import Pedido from '../components/Pedido';

const OBTENER_PEDIDOS = gql`
    query ObtenerPedidoVendedor {
      obtenerPedidoVendedor {
          id
          pedido {
              id
              cantidad
              nombre
          }
          total
          cliente {
            id
            nombre
            apellido
            email
            telefono
          }
          vendedor
          fecha
          estado
      }
  }
`

const pedidos = () => {
  const {data, loading, error} = useQuery(OBTENER_PEDIDOS);
  if(loading) return "Cargando..."

  const { obtenerPedidoVendedor } = data || {};
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'> Pedidos </h1>
          <Link href="/nuevopedido">
            <p className='bg-blue-800 py-2 px-5 mt-3 mr-2 text-sm hover:bg-gray-800 mb-3 uppercase font-bold inline-block text-white rounded w-full lg:w-auto text-center'> Nuevo Pedido</p>
          </Link>
          {obtenerPedidoVendedor ? (
            obtenerPedidoVendedor.length === 0 ? (
              <p className='mt-5 text-center text2xl'>No hay pedidos aún</p>
            ) : (
              obtenerPedidoVendedor.map(pedido => (
                // renderizar componentes de pedidos
                <Pedido 
                  key={pedido.id}
                  pedido={pedido}
    
                />
              ))
            )
          ) : (
            <p>Cargando...</p>
          )}
      </Layout>
    </div>
  )
}

export default pedidos
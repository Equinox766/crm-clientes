import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';


const pedidos = () => {
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'> Pedidos </h1>
          <Link href="/nuevopedido">
            <p className='bg-blue-800 py-2 px-5 mt-3 mr-2 text-sm hover:bg-gray-800 mb-3 uppercase font-bold inline-block text-white rounded '> Nuevo Pedido</p>
          </Link>
      </Layout>
    </div>
  )
}

export default pedidos
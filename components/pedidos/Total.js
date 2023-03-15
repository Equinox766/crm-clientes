import React, { useContext, useEffect } from 'react';
import PedidoContext from '../../context/pedidos/PedidosContext';


const Total = () => {
  //Context de pedidos
  const pedidoContext = useContext(PedidoContext);
  const {cantidad, total } = pedidoContext;


  return (
    <div className='flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-400'>
        <h2 className='text-gray-800 text-lg'>Total a pagar:</h2>
        <p className='text-gray-800 mt-0 '> Gs. {total.toLocaleString()}</p>
    </div>
  )
}

export default Total
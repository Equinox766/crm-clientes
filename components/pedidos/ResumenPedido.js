import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidosContext';
import ProductoResumen from './ProductoResumen';


const ResumenPedido = () => {
    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { productos } = pedidoContext;

    // console.log(productos);

    return (
    <>
         <p className='mt-10 my-2 border-l-4 bg-white border-gray-800 text-gray-700 p-2 text-sm font-bold'> 3. Ajusta las cantidades del Producto</p>
        {productos.length > 0 ? (
            <>
                {productos.map(producto => (
                    <ProductoResumen 
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </>
        ) : (
            <>
                <p className='mt-5 text-sm text-center text-gray-700 p-2 font-bold'>Aún no hay productos</p>
            </>
        )}
    </>
  )
}

export default ResumenPedido
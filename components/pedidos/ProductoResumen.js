import React, { useContext, useState, useEffect } from 'react';
import PedidoContext from '../../context/pedidos/PedidosContext';


const ProductoResumen = ({producto}) => {

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { cantidadProducto } = pedidoContext;

    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        actualiarCantidad();
    }, [cantidad])

    const actualiarCantidad = () => {
        const nuevoProducto = {...producto, cantidad: Number(cantidad)}
        cantidadProducto(nuevoProducto);
    }

    const {nombre, precio} = producto;
  return (
    <>
        <div className="md:flex m:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p>Gs. {precio}</p>
            </div>
            <input 
                className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigth focus:ouline-none focus:shadow-ouline md:ml-4'
                type="number"
                placeholder='Cantidad'
                onChange={e => setCantidad(e.target.value)}
                value={cantidad}
            />
        </div>    
    </>
  )
}

export default ProductoResumen
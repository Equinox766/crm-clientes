import React, {useEffect, useState} from 'react'

const Pedido = ({pedido}) => {

    const {id, total, cliente, estado} = pedido;

    const [estadoPedido, setEstadoPedido ] = useState(estado);

    useEffect(() =>{
        if(estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
    }, [estadoPedido])

    return (
    <>
        <h1>{pedido.total.toLocaleString()}</h1>
        <div className='mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-2 shadow-lg'>
            <div className="">
                <p className="font-bold text-gray-800">Cliente: {cliente}</p>
                <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>
                <select
                    value={estadoPedido} 
                    className="mt-2 apperance-none bg-blue-600 border-blue-600 text-white p-2 text-center rounded leadig-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs">
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-2">
                    Resumen del Pedido
                </h2>
                {pedido.pedido.map(articulo => (
                    <div key={articulo.id} className='mt-4'>
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad} und</p>
                    </div>
                ))}
            </div>

        </div>
    
    </>
    )
}

export default Pedido
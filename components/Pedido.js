import React, {useEffect, useState} from 'react'
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { MdOutlineMarkEmailRead, MdAddIcCall } from "react-icons/md";
const Pedido = ({pedido}) => {

    const {id, total, cliente: {nombre, apellido, email, telefono}, estado} = pedido;

    const [estadoPedido, setEstadoPedido ] = useState(estado);
    const [clase, setClase ] = useState('');

    useEffect(() =>{
        if(estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido();
    }, [estadoPedido])
    //modifica el color del pedido de acuerdo a su estado
    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500')
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('border-green-500')
        } else {
            setClase('border-red-800')
        }
    }
    return (
    <>
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-2 shadow-lg`}>
            <div className="">
                <p className="font-bold text-gray-800">Cliente: {nombre} {apellido}</p>
                {email && (
                    <p className='flex items-center my-2'>
                        <MdOutlineMarkEmailRead size={20} /> 
                         {email}
                    </p>
                )}
                {telefono  && (
                    <p className='flex items-center my-2'>
                        <MdAddIcCall size={20} /> 
                         {telefono}
                    </p>
                )}
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
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}
                <p className='text-gray-800 mt-3 font-bold'>Total a pagar: 
                    <span className='font-light'> Gs. {total.toLocaleString()}</span>
                </p>
                <button
                    className='flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold'
                >
                    Eliminar Pedido
                    <TiDeleteOutline size={25} />
                </button>
            </div>
            
        </div>
    
    </>
    )
}

export default Pedido
import {gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
//Context de pedidos
import PedidoContext from '../context/pedidos/PedidosContext';

const NUEVO_PEDIDO = gql`
    mutation NuevoPedido($input: PedidoInput) {
        nuevoPedido(input: $input) {
            id
        }
    }
`;


const nuevopedido = () => {
    const router = useRouter();
    const [ mensaje, setMensaje ] = useState(null);
    // Utilizar el context y utilizar sus valores
    const pedidoContext = useContext(PedidoContext);
    const {cliente, productos, total} = pedidoContext;

    
    //MUTATION PARA CREAR UN PEDIDO
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO)

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? "opacity-50 cursor-not-allowed" : ""
    }
    
    const crearNuevoPedido = async () => {
        const { id } = cliente;
        //Remover lo no deseado de productos
        const pedido = productos.map(( {__typename, existencia, ...producto}) => producto)
        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })

            // Redireccionar
            router.push('/pedidos')

            //Mostar Alerta
            Swal.fire(
                'Correcto!',
                'El pedido se registro correctamente',
                'success'
            )
        } catch (error) {
            setMensaje(error.message);

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }
    const mostrarMensaje = () => {
        return (
          <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <p>{mensaje}</p>
          </div>
        )
      }
    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-ligth'>Crear Nuevo Pedido </h1>
            {mensaje && mostrarMensaje() }
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />
                    <button
                        type='button'
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >Registrar Pedido</button>
                </div>
            </div>
        </Layout>
    )
}

export default nuevopedido
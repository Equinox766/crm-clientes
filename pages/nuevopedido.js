import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';


//Context de pedidos
import PedidoContext from '../context/pedidos/PedidosContext';



const nuevopedido = () => {

    // Utilizar el context y utilizar sus valores
    const pedidoContext = useContext(PedidoContext);
    
    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-ligth'>Crear Nuevo Pedido </h1>
            <AsignarCliente />
            <AsignarProductos />
        </Layout>
    )
}

export default nuevopedido
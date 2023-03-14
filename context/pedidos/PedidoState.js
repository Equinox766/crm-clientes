import React, { useReducer } from 'react';
import PedidoContext from './PedidosContext';
import PedidoReducer from './PedidoReducer'
import {
    CANTIDAD_PRODUCTO,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO
} from '../../types';

const PedidoState = ({children}) => {
    //State del pedido
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    //Modifica el cliente 
    const agregarCliente = cliente => {
        // console.log(cliente);
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    const agregarProducto = productos => {
        // console.log(productos);
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: productos
        })
    }


    return (
        <PedidoContext.Provider
            value={{
                agregarCliente,
                agregarProducto
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;
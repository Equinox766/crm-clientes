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
        producto: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    //Modifica el cliente 
    const agregarCliente = cliente => {
        console.log(cliente);
    }


    return (
        <PedidoContext.Provider
            value={{
                agregarCliente
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;
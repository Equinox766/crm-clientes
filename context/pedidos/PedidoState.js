import React, { useReducer } from 'react';
import PedidoContext from './PedidosContext';
import PedidoReducer from './PedidoReducer'
import {
    CANTIDAD_PRODUCTO,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    ACTUALIZR_TOTAL
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
    //Modifica los productos
    const agregarProducto = productosSeleccionados => {
        let nuevoState;
        if(state.productos.length > 0) {
            //Toma el seguando arreglo, una copia para guardarlo al primero
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id)
                return {...producto, ...nuevoObjeto}
            })
        } else {
            nuevoState = productosSeleccionados;
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    //Modifica las cantidades de los productos
    const cantidadProducto = nuevoProducto => {
        // console.log('desde PedidosState');
        // console.log(nuevoProducto);
        dispatch({
            type: CANTIDAD_PRODUCTO,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProducto,
                cantidadProducto,
                actualizarTotal
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;
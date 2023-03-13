import { gql, useMutation, useQuery } from '@apollo/client';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import React from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';

//QUERY PARA OBTENER PRODUCTOS
const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
      obtenerProductos {
          id
          nombre
          existencia
          precio
          creado
      }                       
  }
`;
const ELIMINAR_PRODUCTO = gql`
    mutation EliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

const Producto = ({ producto }) => {
    //QUERY PARA OBTENR LOS PRODUCTOS
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);

    //MUTATION PARA ELIMINAR LOS CLIENTES
    const [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {
        etchPolicy: "network-only",
        update(cache) {
            // Obtener una copia del objeto del cache
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS});
            
            //Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos : obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            })
        }
    });

    const {id, nombre, existencia, precio } = producto;

    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: `¿Desea eliminar el producto?`,
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar'
          }).then( async (result) => {

            if (result.isConfirmed) {
                
                try {
                    // Eliminar por ID
                    const { data }  = await eliminarProducto({
                        variables: {
                            id: id
                        }
                    });
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarProducto,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
          })
    }
    const editarProducto = () => {
        Router.push({
            pathname:"/editarproducto/[id]", 
            query: { id }
        })
    }
    return (
        <tr>
            <td className='border px-4 py-2'>{ nombre }</td>
            <td className='border px-4 py-2'>{ existencia }</td>
            <td className='border px-4 py-2'>{ precio }</td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => confirmarEliminarProducto()}
                >
                    Eliminar
                    <TiDeleteOutline size={30} className="ml-2"/>
                </button>
            </td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => editarProducto()}
                >
                    Editar
                    <TiEdit size={25} className="ml-2"/>
                    
                </button>
            </td>
        </tr>
    )
}

export default Producto
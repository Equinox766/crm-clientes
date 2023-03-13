import React from 'react';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router  from 'next/router';



const ELIMINAR_CLIENTE = gql`
    mutation EliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      email
      empresa
      telefono
      vendedor
    }
  }

`;

const Cliente = ({ cliente }) => {

    //MUTATION PARA ELIMINAR CLIENTE
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        fetchPolicy: "network-only",
        update(cache) {
            // Obtener una copia del objeto del cache
            const { obtenerClienteVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO});
            
            //Reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClienteVendedor : obtenerClienteVendedor.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
      }, );
    
    const { nombre, apellido, empresa, email, id } = cliente;

    //Elimina un cliente
    const confirmarEliminarCliente = () => {
        Swal.fire({
            title: `¿Desea eliminar a ${nombre} ${apellido}?`,
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
                    const { data }  = await eliminarCliente({
                        variables: {
                            id: id
                        }
                    });
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarCliente,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
          })
    }

    const editarCliente = () => {
        Router.push({
            pathname:"/editarcliente/[id]", 
            query: { id }
        })
    }
  return (
    
    <tr>
        <td className='border px-4 py-2'>{ nombre } { apellido }</td>
        <td className='border px-4 py-2'>{ empresa }</td>
        <td className='border px-4 py-2'>{ email }</td>
        <td className='border px-4 py-2'>
            <button
                type='button'
                className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                onClick={() => confirmarEliminarCliente()}
            >
                Eliminar
                <TiDeleteOutline size={30} className="ml-2"/>
            </button>
        </td>
        <td className='border px-4 py-2'>
            <button
                type='button'
                className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                onClick={() => editarCliente()}
            >
                Editar
                <TiEdit size={25} className="ml-2"/>
                
            </button>
        </td>
    </tr>
  )
}

export default Cliente
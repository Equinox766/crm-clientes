import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';


const ELIMINAR_CLIENTE = gql`
    mutation EliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;
const Cliente = ({ cliente }) => {

    //MUTATION PARA ELIMINAR CLIENTE
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        fetchPolicy: "network-only",
      });
    
    const { nombre, apellido, empresa, email, id } = cliente;

    //Elimina un cliente
    const confirmarEliminarCliente = id => {
        console.log(id);
        Swal.fire({
            title: '¿Desea eliminar cliente?',
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
                    console.log(data);
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
  return (
    
    <tr>
        <td className='border px-4 py-2'>{ nombre } { apellido }</td>
        <td className='border px-4 py-2'>{ empresa }</td>
        <td className='border px-4 py-2'>{ email }</td>
        <td className='border px-4 py-2'>
            <button
                type='button'
                className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                onClick={() => confirmarEliminarCliente(id)}
            >
                Eliminar
                <TiDeleteOutline size={30} className="ml-2"/>
            </button>
        </td>
    </tr>
  )
}

export default Cliente
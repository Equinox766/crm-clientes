import { gql, useQuery } from '@apollo/client';
import React, {useState, useEffect, useContext} from 'react'
import Select from 'react-select';
import PedidoContext from '../../context/pedidos/PedidosContext';


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

const AsignarCliente = () => {
    const [ cliente, setCliente ] = useState([]);

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente } = pedidoContext;

    //Consultar la BD
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

    useEffect(() => {
        agregarCliente(cliente);
    }, [cliente])

    const seleccionarCliente = clientes => {
        setCliente(clientes)
    }

    //Resultado de la consulta 
    if(loading) return null

    const { obtenerClienteVendedor } = data;
  return (
    <>
        <p className='mt-10 my-2 border-l-4 bg-white border-gray-800 text-gray-700 p-2 text-sm font-bold'> 1. Asigna un Cliente al pedido</p>
        <Select 
            options={ obtenerClienteVendedor }
            onChange={ opcion => seleccionarCliente(opcion) }
            getOptionValue={ opciones => opciones.id }
            getOptionLabel={ opciones => opciones.nombre }
            noOptionsMessage={ () => "No hay resultados" }
            placeholder={'Busque o Selecione el cliente'}


        />
    </>
  )
}

export default AsignarCliente
import { gql, useQuery } from '@apollo/client';
import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import PedidoContext from '../../context/pedidos/PedidosContext';


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

const AsignarProductos = () => {
  const [ productos, setProductos ] = useState([]);

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;
  
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    agregarProducto(productos);
  }, [productos])

  const seleccionarProducto = producto => {
    setProductos(producto);
  }

  if(loading) return null
  const { obtenerProductos } = data;
  return (
    <>
        <p className='mt-10 my-2 border-l-4 bg-white border-gray-800 text-gray-700 p-2 text-sm font-bold'> 2. Selecciona o Busca un producto</p>
        <Select 
            className='mt-3'
            options={ obtenerProductos}
            onChange={ opcion => seleccionarProducto(opcion) }
            isMulti={true}
            getOptionValue={ opciones => opciones.id }
            getOptionLabel={ opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles` }
            noOptionsMessage={ () => "No hay resultados" }
            placeholder={'Busque o Selecione el Producto'}


        />
    </>
  )
}

export default AsignarProductos
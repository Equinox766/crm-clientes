import { useRouter } from 'next/router';
import React from 'react'
import Layout from '../../components/Layout'
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import { gql, useQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';

//QUERY PARA OBTENER PRODUCTOS
const OBTENER_PRODUCTO = gql`
  query ObtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

//MUTATION PARA ACTUALIZAR PRODUCTO
const ACTUALIZAR_PRODUCTO = gql`
    mutation ActualizarProducto($id: ID!, $input: ProductoInput) {
        actualizarProducto(id: $id, input: $input) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

const editarProducto = () => {
    const router = useRouter();
    const { query:  { id }  } = router;
    // console.log(id);

    //Consultar para obtener producto
    const {data, loading, error} = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }
    });

     // Actualizar producto
     const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO);

    // Schema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
                    .required('El nombre del producto es obliatorio'),
        existencia: Yup.number()
                    .positive('La existencia debe ser un número positivo')
                    .integer('La existencia debe ser un número entero')
                    .required('La existencia es requerida'),   
        precio: Yup.number()
                    .positive('El precio debe ser un número positivo')
                    .integer('El precio debe ser un número entero')
                    .required('El precio es requerida'),
      });

      //Actualizar
      const actualizarInfoProducto = async valores => {
        const {nombre, existencia, precio, } = valores;

        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre, 
                        existencia, 
                        precio
                    }
                }
            });
            //SweetALERT
            Swal.fire(
                'Actualizado!',
                'El producto se actualizo correctamente',
                'success'
            )

            router.push('/productos')
        } catch (error) {
            console.log(error);
        }
      }
      if(loading) return "Cargando..."
    //   console.log(data.obtenerProductos);
    const { obtenerProducto } = data;
  return (
    <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'>Editar Producto </h1>
        {/* {mensaje && mostrarMensaje() } */}
        <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
            <Formik 
                validationSchema={schemaValidacion}
                enableReinitialize
                initialValues={obtenerProducto}
                onSubmit={ (valores) => {
                    actualizarInfoProducto(valores)
                }}
            >
                {props => {
                    // console.log(props);
                    return (
                        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                            onSubmit={props.handleSubmit}
                        >
                            <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                    Nombre:
                                    </label>
                                    <input 
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                                    id='nombre'
                                    type="text"
                                    placeholder='Nombre Producto'
                                    value={props.values.nombre}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                            </div>
                            { props.touched.nombre && props.errors.nombre ? 
                                (
                                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.nombre}</p>
                                    </div>
                                ) : null}
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencia'>
                                Cantidad Disponible:
                                </label>
                                <input 
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                                    id='existencia'
                                    type="number"
                                    placeholder='Cantidad Disponible'
                                    value={props.values.existencia}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>
                            { props.touched.existencia && props.errors.existencia ? 
                                (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.existencia}</p>
                                </div>
                                ) : null}
                            <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>
                                Precio:
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                                id='precio'
                                type="number"
                                placeholder='Precio Producto'
                                value={props.values.precio}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            />
                            </div>
                            { props.touched.precio && props.errors.precio ? 
                                (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.precio}</p>
                                </div>
                                ) : null}
                            <input type="submit" value="Editar producto" className="bg-gray-800 w-full p-2 mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" /> 
                        </form>
                    )               
                }}
            </Formik>
        </div>
        </div>
    </Layout>
  )
}

export default editarProducto
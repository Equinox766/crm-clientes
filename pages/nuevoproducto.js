import { useFormik } from 'formik';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';


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

const NUEVO_PRODUCTO = gql`
    mutation NuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            nombre
            precio
            existencia
            id
            creado
        }
    }
`;

const nuevoproducto = () => {
    //MUTATION PARA CREAR NUEVO CLIENTE
    const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO,
        {
            update(cache, { data: { nuevoProducto } } ) {
              //Obtener el objeto de cache que desamos acctualizar
              const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS } );
              
              //REESCRIBIR EL CACHE (NUNCA SE DEBE DE MODIFICAR)
              cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                  obtenerProductos : [...obtenerProductos, nuevoProducto]
                }
              })
            }
          }
        );
    //ROUTING
    const router = useRouter();

    //State para el mensaje
    const [ mensaje, guardarMensaje ] = useState(null);

    // validacion del cliente
    const formik = useFormik({
    initialValues: {
    nombre: '',
    existencia: '',
    precio: ''
    }, 
    validationSchema: Yup.object({
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
    }),
    onSubmit: async valores => {

    // DESTRUCTURACION
    const { nombre, existencia, precio } = valores;

    try {
        const { data } = await nuevoProducto({
            variables: {
                input: {
                    nombre,
                    existencia,
                    precio
                }
            }
        });
        Swal.fire(
            'Correcto!',
            'Se creo correctamente el producto',
            'success'
        )
        router.push('/productos')
    } catch (error) {
        guardarMensaje(error.message);
        setTimeout(() => {
        guardarMensaje(null);
        }, 3000)
    }
    }
    })
    const mostrarMensaje = () => {
    return (
    <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
    </div>
    )
    }
    return (
    <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'>Nuevo Producto </h1>
        {mensaje && mostrarMensaje() }
        <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
            <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
          onSubmit={formik.handleSubmit}
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
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                </div>
                { formik.touched.nombre && formik.errors.nombre ? 
                    (
                        <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.nombre}</p>
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
                    value={formik.values.existencia}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </div>
                { formik.touched.existencia && formik.errors.existencia ? 
                    (
                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.existencia}</p>
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
                    value={formik.values.precio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </div>
                { formik.touched.precio && formik.errors.precio ? 
                    (
                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.precio}</p>
                    </div>
                    ) : null}
                    <input type="submit" value="agregar nuevo producto" className="bg-gray-800 w-full p-2 mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" />
            </form>
        </div>
        </div>
    </Layout>
    )
}

export default nuevoproducto
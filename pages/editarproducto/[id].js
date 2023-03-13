import { useRouter } from 'next/router';
import React from 'react'
import Layout from '../../components/Layout'
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import { gql, useQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';



const editarProducto = () => {
    const router = useRouter();
    const { query:  { id }  } = router;
    console.log(id);
  return (
    <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'>Editar Producto </h1>
        {/* {mensaje && mostrarMensaje() } */}
        <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
            <Formik 
            
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
                                // value={formik.values.nombre}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* { formik.touched.nombre && formik.errors.nombre ? 
                                (
                                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.nombre}</p>
                                    </div>
                                ) : null} */}
                                            <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencia'>
                                Existencia:
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                                id='existencia'
                                type="number"
                                placeholder='Existencia Producto'
                                // value={formik.values.existencia}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                            </div>
                            {/* { formik.touched.existencia && formik.errors.existencia ? 
                                (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.existencia}</p>
                                </div>
                                ) : null} */}
                            <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>
                                Precio:
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                                id='precio'
                                type="number"
                                placeholder='Precio Producto'
                                // value={formik.values.precio}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                            />
                            </div>
                            {/* { formik.touched.precio && formik.errors.precio ? 
                                (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.precio}</p>
                                </div>
                                ) : null} */}
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
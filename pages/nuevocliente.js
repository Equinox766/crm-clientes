import { useFormik } from 'formik';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import Swal from 'sweetalert2';




const NUEVO_CLIENTE = gql`
    mutation NuevoCliente($input: ClienteInput) {
      nuevoCliente(input: $input) {
        id
        nombre
        apellido
        email
        empresa
        telefono
      }
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
    }
  }

`;

const nuevocliente = () => {

  //Mutation para Crear Nuevo Cliente
  const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, 
    {
      update(cache, { data: { nuevoCliente } } ) {
        //Obtener el objeto de cache que desamos acctualizar
        const { obtenerClienteVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO } );
        
        //REESCRIBIR EL CACHE (NUNCA SE DEBE DE MODIFICAR)
        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIO,
          data: {
            obtenerClienteVendedor : [...obtenerClienteVendedor, nuevoCliente]
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
      apellido: '',
      empresa: '',
      email: '',
      telefono: ''
    }, 
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .required('El nombre del cliente es obliatorio'),
      apellido: Yup.string()
                  .required('El apellido del cliente es obliatorio'),      
      empresa: Yup.string()
                  .required('La empresa del cliente es obliatorio'),
      email: Yup.string()
                  .email('Email no valido')
                  .required('El email del cliente es obliatorio'),
    }),
    onSubmit: async valores => {
      
      // DESTRUCTURACION
      const { nombre, apellido, email, empresa, telefono } = valores;

      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              empresa,
              telefono
            }
          }
        });
        //SweetALERT
        Swal.fire(
          'Correcto!',
          'Se creo el cliente correctamente',
          'success'
      )
        router.push('/')
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
      <h1 className='text-2xl text-gray-800 font-ligth'>Nuevo Cliente </h1>
      {mensaje && mostrarMensaje() }
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                    Nombre:
                  </label>
                  <input 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                    id='nombre'
                    type="text"
                    placeholder='Nombre Cliente'
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
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                  Apellido:
                </label>
                <input 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                  id='apellido'
                  type="text"
                  placeholder='Apellido Cliente'
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              { formik.touched.apellido && formik.errors.apellido ? 
                  (
                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.apellido}</p>
                    </div>
                  ) : null}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email:
                </label>
                <input 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                  id='email'
                  type="email"
                  placeholder='Email Cliente'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              { formik.touched.email && formik.errors.email ? 
                  (
                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                  Empresa:
                </label>
                <input 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                  id='empresa'
                  type="text"
                  placeholder='Empresa Cliente'
                  value={formik.values.empresa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              { formik.touched.empresa && formik.errors.empresa ? 
                  (
                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                  Telefono:
                </label>
                <input 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                  id='telefono'
                  type="tel"
                  placeholder='Telefono Cliente'
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              { formik.touched.telefono && formik.errors.telefono ? 
                  (
                    <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.telefono}</p>
                    </div>
                  ) : null}
                  <input type="submit" value="Registrar cliente" className="bg-gray-800 w-full p-2 mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default nuevocliente;
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'
import React from 'react';
import Layout from '../../components/Layout';



const OBTENER_CLIENTES = gql`
    query ObtenerCliente($id: ID!) {
        obtenerCliente(id: $id) {
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

const ACTUALIZAR_CLIENTE = gql`
    mutation ActualizarCliente($id: ID!, $input: ClienteInput) {
        actualizarCliente(id: $id, input: $input) {
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

const EditarCliente = () => {
    const router = useRouter();
    const { query:  { id }  } = router;
    // console.log(id);

    //Consultar para obtener cliente 
    const {data, loading, error} = useQuery(OBTENER_CLIENTES, {
        variables: {
            id
        }
    });

    // Actualizar cliente
    const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE);

    // Schema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
                    .required('El nombre del cliente es obliatorio'),
        apellido: Yup.string()
                    .required('El apellido del cliente es obliatorio'),      
        empresa: Yup.string()
                    .required('La empresa del cliente es obliatorio'),
        email: Yup.string()
                    .email('Email no valido')
                    .required('El email del cliente es obliatorio'),
      });


      //Modificar el cliente en la BD

      const actualizarInfoCliente = async valores => {
        const {nombre, apellido, empresa, email, telefono } = valores;

        try {
            const { data } = await actualizarCliente({
                variables: {
                    id,
                    input: {
                        nombre, 
                        apellido, 
                        empresa, 
                        email, 
                        telefono
                    }
                }
            });
            //SweetALERT
            Swal.fire(
                'Actualizado!',
                'El cliente se actualizo correctamente',
                'success'
            )

            router.push('/')
        } catch (error) {
            console.log(error);
        }
      }

      //LLenar los varoles

    if(loading) return "Cargando...";
    // console.log(data.obtenerCliente);
    
    const { obtenerCliente } = data ?? {};

  return (
    <Layout>
        <h1 className='text-2xl text-gray-800 font-ligth'>Editar Cliente </h1>
        {/* {mensaje && mostrarMensaje() } */}
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <Formik
                    validationSchema={schemaValidacion}
                    enableReinitialize
                    initialValues={obtenerCliente}
                    onSubmit={ (valores, funciones) => {
                        actualizarInfoCliente(valores)
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
                                placeholder='Nombre Cliente'
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
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                            Apellido:
                            </label>
                            <input 
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lesding-tight focus:ouline-none focus:shadow-outline'
                            id='apellido'
                            type="text"
                            placeholder='Apellido Cliente'
                            value={props.values.apellido}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            />
                        </div>
                        { props.touched.apellido && props.errors.apellido ? 
                            (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{props.errors.apellido}</p>
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
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            />
                        </div>
                        { props.touched.email && props.errors.email ? 
                            (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{props.errors.email}</p>
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
                            value={props.values.empresa}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            />
                        </div>
                        { props.touched.empresa && props.errors.empresa ? 
                            (
                                <div className='my-2 bg-red-100 border-red-500 border-l-4 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{props.errors.email}</p>
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
                            value={props.values.telefono}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            />
                        </div>
                            <input type="submit" value="Editar cliente" className="bg-gray-800 w-full p-2 mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" />
                    </form>
                    )
                }}
                </Formik>
            </div>
        </div>
    </Layout>
  )
}

export default EditarCliente
// AXIOS IMPORTS
import instance from 'services/axios_config';

import { addUser, deleteUser } from '../users_slices/users_slice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// GET DATA FROM API AND SEND TO STORE
export const getUserData = (dispatch, deleteId) => {
    instance.get('users/')
        .then((data) => {
            const user = data.data?.results;
            user.map((user) => {
                let { id, first_name, last_name, email, password, rut, groups } = user;
                dispatch(addUser({
                    id: id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    rut: rut,
                    groups: groups,
                }));
            });
            dispatch(deleteUser({ id: deleteId }));
        })
        .catch((error) => {
            console.error(error);
        })
}

// POST DATA TO THE API
export const postData = (data) => {
    instance.post('users/', {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        password: data?.password,
        rut: data?.rut,
        groups: [data?.group]
    })
        .then((response) => {
            //console.log(response);
            toast.success("Usuario agregado correctamente")
        })
        .catch((error) => {
            console.error(error);
            toast.error("Error al agregar usuario")
        })
}

// UPDATE DATA ON THE API
export const updateData = (id, data) => {
    instance.put(`users/${id}/`, {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        password: data?.email,
        rut: data?.rut,
        groups: [data?.group],
    })
        .then((response) => {
            //console.log(response);
            toast.success("Usuario Actualizado correctamente")
        })
        .catch((error) => {
            console.error(error);
            toast.error("Error al actualizar usuario")
        })
}

    // DELETE DATA ON THE API
    export const deleteData = (id) => {
        instance.delete(`users/${id}/`)
            .then((response) => {
                //console.log(response);
                toast.success("Usuario Eliminado Correctamente");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error al eliminar usuario")
            })
    }


    // DELETE DATA ON THE API
    export const resetPassword = (data) => {
        //console.log(data)
        instance.patch(`users/reset/password/`,data)
            .then((response) => {
                //console.log(response);
                toast.success("Usuario Eliminado Correctamente");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error al eliminar usuario")
            })
        }

// AXIOS IMPORTS
import instance from 'services/axios_config';

// SLICE IMPORTS
import { addSubFamily, deleteSubFamily } from '../subFamilies_slices.js/subFamilies_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// GET DATA FROM API AND SEND TO STORE
export const getSubFamilyData = (dispatch, deleteId, filters) => {
    if (!filters) {
        return filters = {
            familyFilter: '',
        }
    }

    instance.get(`material-subfamilies/?limit=10000&material_family=${filters.familyFilter}`)
        .then((data) => {
            const subFamilies = data.data?.results;
            subFamilies.map((subFamily) => {
                const { id, name, description, material_family } = subFamily;
                dispatch(addSubFamily({
                    id: id,
                    name: name,
                    description: description,
                    material_family: material_family.id,
                    material_family_name: material_family.name,
                }))
            });
            dispatch(deleteSubFamily({ id: deleteId }));
        })
        .catch((error) => {
            console.error(error);
        })
}

// DATA MOD TO THE API
export const postData = (data) => {
    instance.post('material-subfamilies/', {
        name: data?.name,
        description: data?.description,
        material_family: data?.material_family,
    })
        .then(function (response) {
            //console.log(response);
            response(toast.success("SubFamilia Agregada Correctamente"))
        })
        .catch(function (error) {
            console.error(error);
            response(toast.error("Error al Agregar SubFamilia"))
        })
}

// UPDATE DATA TO THE API
export const updateData = (id, data) => {
    instance.put(`material-subfamilies/${id}/`, {
        name: data?.name,
        description: data?.description,
        material_family: data?.material_family
    })
        .then(function (response) {
            //console.log(response);
            response(toast.success("Subfamilia actualizada correctamente"))
        })
        .catch(function (error) {
            console.error(error);
            response(toast.error("Error al actualizar SubFamilia"))
        })
}

// DELETE DATA FROM API
export const deleteData = (id) => {
    instance.delete(`material-subfamilies/${id}/`)
        .then(function (response) {
            //console.log(response);
            response(toast.success("SubFamilia Eliminada correctamente"))
        })
        .catch(function (error) {
            console.error(error);
            response(toast.error("Error al eliminar SubFamilia"))
        })
}
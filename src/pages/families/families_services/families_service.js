// AXIOS IMPORT
import instance from 'services/axios_config';

// SLICE IMPORT
import { addFamily, deleteFamily } from '../families_slices.js/families_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// GET DATA FROM API AND SEND TO THE STORE
export const getFamilyData = (dispatch, deleteId) => {
    // export const getFamilyData  = (filters, deleteId) =>(dispatch)=>{
    //console.log(dispatch)
    // (filters)=> (dispatch) =>

    // let f ={}
    //     filters?.name? f.name=filters?.name : f.name=''
    //     filters?.description? f.description=filters?.description : f.description=''
    

    // instance.get('material-families/?limit=1000&name='+f?.name+'&description='+f?.description)
    instance.get('material-families/?limit=1000')
        .then((data) => {
            const families = data.data?.results;
            families.map((family) => {
                const { id, name, description } = family;
                dispatch(addFamily({
                    id: id,
                    name: name,
                    description: description
                }))
                dispatch(deleteFamily({ id: deleteId }))
            });
        })
        .catch((error) => {
            console.error(error)
            return (error);

        })
}

// DATA MOD TO THE API
export const postData = (data) => {
    instance.post('material-families/', {
        name: data?.name,
        description: data?.description,
    })
        .then(function (response) {
            //console.log(response);
            return(toast.success("Familia Agregada"))
        })
        .catch(function (error) {
            console.error(error);
            return(toast.error("Error al agregar familia"))
        })
}

// UPDATE DATA TO THE API
export const updateData = (id, data) => {
    instance.put(`material-families/${id}/`, {
        name: data?.name,
        description: data?.description,
    })
        .then(function (response) {
            //console.log(response);
            return(toast.success("Familia Actualizada"))
        })
        .catch(function (error) {
            console.error(error);
            return(toast.error("Error al actualizar familia"))
        })
}

// DELETE DATA FROM API
export const deleteData = (id) => {
    instance.delete(`material-families/${id}/`)
        .then(function (response) {
            //console.log(response);
            return(toast.success("Familia Eliminada"))
            
        })
        .catch(function (error) {
            console.error(error);
            return(toast.error("Error al eliminar familia"))
        })
}


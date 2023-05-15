// AXIOS IMPORT
import instance from 'services/axios_config';
import { addMaterial, deleteMaterial } from '../materials_slices/materials_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// GET DATA FROM API AND SEND TO THE STORE
export const getMaterialData = (dispatch, deleteId, filters) => {
    console.log("caragndo datos");
    if(!filters) {
        return filters = {
            familyFilter: '',
            subFamilyFilter: '',
        }
    }
    instance.get(`materials/?limit=10000&material_family=${filters.familyFilter}&material_subfamily=${filters.subFamilyFilter}`)
        .then((data) => {
            const materials = data.data?.results;
            materials.map((material) => {
                const { id, name, description, code, price, measure_unit, material_family_data, material_family, material_subfamily_data, material_subfamily } = material;
                dispatch(addMaterial({
                    id: id,
                    name: name,
                    description: description,
                    code: code,
                    price: price,
                    measure_unit: measure_unit,
                    material_family: material_family_data.name,
                    material_family_id: material_family,
                    material_subfamily: material_subfamily_data.name,
                    material_subfamily_id: material_subfamily,
                }))
            });
            dispatch(deleteMaterial({ id: deleteId }))
        })
        .catch((error) => {
            console.log(error);
        })
}
//ONlY Materials 
export const getMaterialDataMain = (dispatch, setLoading, navigate) => {
    //window.location()
    instance.get(`materials/?limit=10000`)
        .then((data) => {
            const materials = data.data?.results;
            //console.log(materials)
            materials.map((material) => {
                const { id, name, description, code, price, measure_unit, material_family_data, material_family, material_subfamily_data, material_subfamily } = material;
                dispatch(addMaterial({
                    id: id,
                    name: name,
                    description: description,
                    code: code,
                    price: price,
                    measure_unit: measure_unit,
                    material_family: material_family_data.name,
                    material_family_id: material_family,
                    material_subfamily: material_subfamily_data.name,
                    material_subfamily_id: material_subfamily,
                }))
            });
            navigate('/projects');
        })
        .catch((error) => {
            console.log(error);
            //window.localStorage.clear()
            setLoading(false)
            //window.location = "/";
        })
}
// POST DATA TO THE API
export const postData = (data) => {
    instance.post('materials/', {
        name: data?.name,
        description: data?.description,
        code: data?.code,
        price: data?.price,
        measure_unit: data?.measure_unit,
        material_family: data?.material_family,
        material_subfamily: data?.material_subfamily,
    })
        .then(function (response) {
            //console.log(response);
            return(toast.success("Material Agregado correctamente"))
        })
        .catch(function (error) {
            console.log(error);
            return(toast.error("Error al agregar Material"))
        })
}

// DATA MOD TO THE API
export const updateData = (id, data) => {
    instance.put(`materials/${id}/`, {
        name: data?.name,
        description: data?.description,
        code: data?.code,
        price: data?.price,
        measure_unit: data?.measure_unit,
        material_family: data?.material_family,
        material_subfamily: data?.material_subfamily,
    })
        .then(function (response) {
            //console.log(response);
            return(toast.success("Material actualizado correctamente"))
        })
        .catch(function (error) {
            console.error(error);
            return(toast.error("Error al actualizar Material"))
        })
}

// DELETE DATA FROM THE API
export const deleteData = (id) => {
    instance.delete(`materials/${id}/`)
        .then(function (response) {
            //console.log(response);
            return(toast.success("Material Eliminado correctamente"))
        })
        .catch(function (error) {
            console.error(error);
            return(toast.error("Error al eliminar material"))
        })
}

// MATERIALS UPLOAD TEMPLATE 
export const downloadTemplate = () => {
    instance.get(`materials-upload-template`, { responseType: 'blob'})
    .then((response) => {
        //console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'modelo-carga-materiales');
        document.body.appendChild(link);
        link.click();
    })
    .catch((error) => {
        console.log(error);
    })
}

// MASSIVE UPLOAD
export const uploadFile = (FormData) => {
    instance.post(`import-excel/materials/`, FormData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}
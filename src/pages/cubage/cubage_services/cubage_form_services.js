import instance from 'services/axios_config';
import { ToastContainer, toast } from 'react-toastify';

// UPDATE DATA OF CUBAGE

export const postCubage = (data, pid, currentDate) => {
    instance.post(`cubications/`, {
        activity: data?.activity,
        start_date: currentDate, //data?.start_date,
        end_date: "2023-12-12", //data?.end_date,
        data_sheet: pid,//data?.data_sheet,
        //supervised_by: 21, //data?.supervised_by,
        //cubicator: 2, //data?.cubicator,
    })
    .then(function (response) {
        //console.log(response);
        toast.success('Actividad agregada')
    })
    .catch((err) => {
        console.error(err);
        toast.error('Solo se pueden crear actividades para un proyecto en estado: en cubicación')
/*         if(err?.response?.data && err.status != 500) {
            for(let errHead in err?.response?.data)
            toast.error(err.response?.data[errHead], 'Error ')
        } else {
            toast.error('Solo se pueden crear actividades para un proyecto en estado: en cubicación')
        } */
    })
}

export const updateCubage = (id, data) =>  {
    instance.put(`cubications/${id}/`, {
        activity: data?.activity,
        start_date: data?.start_date,
        end_date: data?.end_date,
        data_sheet: data?.data_sheet,
        supervised_by: data?.supervised_by,
        cubicator: data?.cubicator,
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    })
}

export const deleteData = (id) => {
    instance.delete(`material-families/${id}/`)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    })
}
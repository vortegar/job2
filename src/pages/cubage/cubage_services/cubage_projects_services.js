import instance from 'services/axios_config';
import { addCurrentCubage, deleteCurrentCubage } from '../cubage_slices/current_cubage_slice';
import { addCubageProject, deleteCubageProject } from '../cubage_slices/full_cubage_sections/cubageProjects_slice';



// DATA GET FROM API
export const getCubageData = (dispatch, deleteId, pid) => {
    instance.get(`cubications/?limit=1000&data_sheet=${pid}`)
    .then((data) => {
        const cubage = data.data?.results;
        cubage.map((cubage) => {
            const {id,
                activity, 
                start_date, 
                end_date, 
                status,
                data_sheet,
                created_by,
                supervised_by,
                cubicator
            } = cubage;
            dispatch(addCubageProject({
                id: id,
                activity: activity,
                start_date: start_date,
                end_date: end_date,
                status: status,
                data_sheet: data_sheet,
                project_title: data_sheet.project_title,
                created_by: created_by,
                created_by_name: created_by.full_name,
                supervised_by: supervised_by,
                cubicator:  cubicator,
            }));
        });
        dispatch(deleteCubageProject({id: deleteId}))
    })
    .catch((error) => {
        console.error(error);
    })
}

export const getCurrentCubage = (id, dispatch, deleteId) => {
    instance.get(`cubications/${id}/`)
    .then((data) => {
        //console.log(data);
        const {id,
            activity, 
            start_date, 
            end_date, 
            status,
            data_sheet,
            created_by,
            supervised_by,
            cubicator
        } = data?.data;
        dispatch(addCurrentCubage({
            id: id,
                activity: activity,
                start_date: start_date,
                end_date: end_date,
                status: status,
                data_sheet: data_sheet,
                project_title: data_sheet.project_title,
                created_by: created_by,
                created_by_name: created_by.full_name,
                supervised_by: supervised_by,
                cubicator:  cubicator,
        }));
        dispatch(deleteCurrentCubage({id: deleteId}))
    })
    .catch((error) => {
        console.error(error);
    })
}
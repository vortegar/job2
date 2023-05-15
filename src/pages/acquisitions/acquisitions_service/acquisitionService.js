// AXIOS IMPORT
import instance from 'services/axios_config';
import { reducerAcquisition } from '../acquisitions_slice/acquisitions_slice';


export const getTotalization = (id, dispatch) => {
    instance.get(`cubage-totals/${id}/`)
    .then((response)=>{
        response.data.material_group_material?.map((el) => {
            dispatch(reducerAcquisition(el))
        })
        console.log('acquisition', response.data.material_group_material)
    }).catch((error)=>{
        console.log(error);
    })
}